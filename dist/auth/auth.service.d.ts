import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login.response';
import { tbl_token } from 'src/users/users.entity';
import { Repository, Connection } from 'typeorm';
export declare class AuthService {
    private usersService;
    private jwtService;
    private tokenRepository;
    private readonly connection;
    constructor(usersService: UsersService, jwtService: JwtService, tokenRepository: Repository<tbl_token>, connection: Connection);
    login(email: string, pass: string, browserInfo?: string): Promise<any>;
    refreshToken(refreshToken: string, browserInfo?: string): Promise<LoginResponse>;
    validateUser(email: string, password: string): Promise<any>;
    private generateAccessToken;
    private createRefreshToken;
    private saveRefreshToken;
    private validateRefreshToken;
    logout(refreshToken: string): Promise<void>;
    logoutAll(userId: string): Promise<void>;
    findAllTokens(userId: string): Promise<any[]>;
    private removeRefreshTokenFamilyIfCompromised;
    private rotateRefreshToken;
    private getUserRole;
}
