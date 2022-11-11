import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InvalidEmailOrPasswordException } from './exceptions/invalid-email-or-password.exception.';
import { LoginResponse } from './dto/login.response';
import { compare } from 'bcrypt';
import { accessJwtConfig, refreshJwtConfig } from 'src/config';
import { getTokenExpirationDate } from 'src/util/getTokenExpirationDate';
import { v4 as uuidV4 } from 'uuid';
import { RefreshTokenPayload } from './types/refresh-token-payload';
import { InvalidRefreshTokenException } from './exceptions/invalid-refresh-token.exception';
import { tbl_token } from 'src/users/users.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection, DataSource, FindOperator } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(tbl_token)
    private tokenRepository: Repository<tbl_token>,
    @InjectConnection()
    private readonly connection: Connection
  ) {}

  async login(email: string, pass: string, browserInfo?: string): Promise<any> {
    
    const userdata = await this.validateUser(email, pass);
    
    const payload = { sub: userdata.id, userRole: userdata.role};

    const accessToken = await this.generateAccessToken(payload);

    const refreshToken = await this.createRefreshToken(
      { sub: payload.sub },
      browserInfo,
    );

    return {
      accessToken,
      refreshToken,
    };
  
  }

  /** Refreshes and rotates user's access and refresh tokens */
  async refreshToken(
    refreshToken: string,
    browserInfo?: string,
  ): Promise<LoginResponse> {
    const refreshTokenContent: RefreshTokenPayload =
      await this.jwtService.verifyAsync(refreshToken, refreshJwtConfig);

    await this.validateRefreshToken(refreshToken, refreshTokenContent);

    const userRole = await this.getUserRole(refreshTokenContent.sub);

    const accessToken = await this.generateAccessToken({
      sub: refreshTokenContent.sub,
      userRole,
    });

    const newRefreshToken = await this.rotateRefreshToken(
      refreshToken,
      refreshTokenContent,
      browserInfo,
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
  
  async validateUser(email: string, password: string): Promise<any> {
  
    const userdata = await this.usersService.findByEmail(email);

    if (userdata) {
      
      let isPasswordValid = compare(password, userdata.password);
    
      if (isPasswordValid) {
        return { ...userdata, password: undefined };
      }
    }
    
    throw new InvalidEmailOrPasswordException();
    
  }

  private async generateAccessToken(payload: {
    sub: string;
    userRole: string;
  }): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      payload,
      accessJwtConfig,
    );

    return accessToken;
  }

  private async createRefreshToken(
    payload: {
      sub: string;
      tokenFamily?: string;
    },
    browserInfo?: string,
  ): Promise<string> {
    if (!payload.tokenFamily) {
      payload.tokenFamily = uuidV4();
    }

    const refreshToken = await this.jwtService.signAsync(
      { ...payload },
      refreshJwtConfig,
    );

    await this.saveRefreshToken({
      userId: payload.sub,
      refreshToken,
      family: payload.tokenFamily,
      browserInfo,
    });

    return refreshToken;
  }

  /** Saves the new refresh token hashed in the database */
  private async saveRefreshToken(refreshTokenCredentials: {
    userId: string;
    refreshToken: string;
    family: string;
    browserInfo?: string;
  }): Promise<void> {
    const expiresAt = getTokenExpirationDate();

    await this.usersService.userTokensCreate({
      data: { ...refreshTokenCredentials, expiresAt },
    });
    
  }

  /** Checks if the refresh token is valid */
  private async validateRefreshToken(
    refreshToken: string,
    refreshTokenContent: RefreshTokenPayload,
  ): Promise<boolean> {
    const userTokens = await this.tokenRepository.count({where: { userId: Number(refreshTokenContent), refreshToken: refreshToken }});
    const isRefreshTokenValid = userTokens > 0;
    if (!isRefreshTokenValid) {
      await this.removeRefreshTokenFamilyIfCompromised(
        refreshTokenContent.sub,
        refreshTokenContent.tokenFamily,
      );
      throw new InvalidRefreshTokenException();
    }
    return true;
  }

  /** Deletes the refreshToken from the database*/
  async logout(refreshToken: string): Promise<void> {
    await this.tokenRepository.delete({refreshToken: refreshToken});
  }

  /** Deletes all user's refresh tokens */
  async logoutAll(userId: string): Promise<void> {
    await this.tokenRepository.delete({userId: Number(userId)});
  }

  /** Returns all user's active tokens */
  async findAllTokens(userId: string): Promise<any[]> {
    const tokens = await this.tokenRepository.find({where: {userId: Number(userId)}});
    return tokens;
  }

  /** Removes a compromised refresh token family from the database
   *
   * If a token that is not in the database is used but it's family exists
   * that means the token has been compromised and the family should me removed
   *
   * Refer to https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation#automatic-reuse-detection
   */
   private async removeRefreshTokenFamilyIfCompromised(
    userId: string,
    tokenFamily: string,
  ): Promise<void> {
    const familyTokens = await this.tokenRepository.count({where: {userId: Number(userId), family: tokenFamily}});

    if (familyTokens > 0) {
      await this.tokenRepository.delete({userId: Number(userId), family: tokenFamily});
    }
  }

  /** Removes the old token from the database and creates a new one */
  private async rotateRefreshToken(
    refreshToken: string,
    refreshTokenContent: RefreshTokenPayload,
    browserInfo?: string,
  ): Promise<string> {

    await this.tokenRepository.delete({refreshToken: refreshToken});

    const newRefreshToken = await this.createRefreshToken(
      {
        sub: refreshTokenContent.sub,
        tokenFamily: refreshTokenContent.tokenFamily,
      },
      browserInfo,
    );

    return newRefreshToken;
  }

  private async getUserRole(userId: string): Promise<string> {
    const user = await this.usersService.findById(userId);

    return user.role;
  }

}