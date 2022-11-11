import { Body, Controller, Get, Post, UseGuards, Response, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginResponse } from './dto/login.response';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
      @Body() { email, password }: LoginCredentialsDto,
      @Req() request: Request,
    ): Promise<LoginResponse> {
      const browserInfo =
      `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        '',
      );
      return this.authService.login(email, password, browserInfo);
    }
    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK) 
    async refreshToken(
      @Body() { refreshToken }: RefreshTokenDto,
      @Req() request: Request,
    ): Promise<LoginResponse> {
      const browserInfo =
        `${request.ip} ${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
          / undefined/g,
          '',
        );
  
      return this.authService.refreshToken(refreshToken, browserInfo);
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //   return req.user;
    // }

    /** Logs out the User from the current session */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() { refreshToken }: LogoutDto): Promise<void> {
    return this.authService.logout(refreshToken);
  }

  /** Logs out the User from all sessions */
  @Post('logoutAll')
  @HttpCode(HttpStatus.OK)
  async logoutAll(@Req() request: Request): Promise<void> {
    const { userId } = request.user as { userId: string };

    return this.authService.logoutAll(userId);
  }

  /** Returns all user's active tokens */
  @Get('tokens')
  async findAllTokens(@Req() request: Request): Promise<any[]> {
    const { userId } = request.user as { userId: string };

    return this.authService.findAllTokens(userId);
  }

}