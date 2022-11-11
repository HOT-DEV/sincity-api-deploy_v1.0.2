import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginResponse } from './dto/login.response';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login({ email, password }: LoginCredentialsDto, request: Request): Promise<LoginResponse>;
    refreshToken({ refreshToken }: RefreshTokenDto, request: Request): Promise<LoginResponse>;
    logout({ refreshToken }: LogoutDto): Promise<void>;
    logoutAll(request: Request): Promise<void>;
    findAllTokens(request: Request): Promise<any[]>;
}
