"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const invalid_email_or_password_exception_1 = require("./exceptions/invalid-email-or-password.exception.");
const bcrypt_1 = require("bcrypt");
const config_1 = require("../config");
const getTokenExpirationDate_1 = require("../util/getTokenExpirationDate");
const uuid_1 = require("uuid");
const invalid_refresh_token_exception_1 = require("./exceptions/invalid-refresh-token.exception");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(usersService, jwtService, tokenRepository, connection) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.connection = connection;
    }
    async login(email, pass, browserInfo) {
        const userdata = await this.validateUser(email, pass);
        const payload = { sub: userdata.id, userRole: userdata.role };
        const accessToken = await this.generateAccessToken(payload);
        const refreshToken = await this.createRefreshToken({ sub: payload.sub }, browserInfo);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(refreshToken, browserInfo) {
        const refreshTokenContent = await this.jwtService.verifyAsync(refreshToken, config_1.refreshJwtConfig);
        await this.validateRefreshToken(refreshToken, refreshTokenContent);
        const userRole = await this.getUserRole(refreshTokenContent.sub);
        const accessToken = await this.generateAccessToken({
            sub: refreshTokenContent.sub,
            userRole,
        });
        const newRefreshToken = await this.rotateRefreshToken(refreshToken, refreshTokenContent, browserInfo);
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
    async validateUser(email, password) {
        const userdata = await this.usersService.findByEmail(email);
        if (userdata) {
            let isPasswordValid = (0, bcrypt_1.compare)(password, userdata.password);
            if (isPasswordValid) {
                return Object.assign(Object.assign({}, userdata), { password: undefined });
            }
        }
        throw new invalid_email_or_password_exception_1.InvalidEmailOrPasswordException();
    }
    async generateAccessToken(payload) {
        const accessToken = await this.jwtService.signAsync(payload, config_1.accessJwtConfig);
        return accessToken;
    }
    async createRefreshToken(payload, browserInfo) {
        if (!payload.tokenFamily) {
            payload.tokenFamily = (0, uuid_1.v4)();
        }
        const refreshToken = await this.jwtService.signAsync(Object.assign({}, payload), config_1.refreshJwtConfig);
        await this.saveRefreshToken({
            userId: payload.sub,
            refreshToken,
            family: payload.tokenFamily,
            browserInfo,
        });
        return refreshToken;
    }
    async saveRefreshToken(refreshTokenCredentials) {
        const expiresAt = (0, getTokenExpirationDate_1.getTokenExpirationDate)();
        await this.usersService.userTokensCreate({
            data: Object.assign(Object.assign({}, refreshTokenCredentials), { expiresAt }),
        });
    }
    async validateRefreshToken(refreshToken, refreshTokenContent) {
        const userTokens = await this.tokenRepository.count({ where: { userId: Number(refreshTokenContent), refreshToken: refreshToken } });
        const isRefreshTokenValid = userTokens > 0;
        if (!isRefreshTokenValid) {
            await this.removeRefreshTokenFamilyIfCompromised(refreshTokenContent.sub, refreshTokenContent.tokenFamily);
            throw new invalid_refresh_token_exception_1.InvalidRefreshTokenException();
        }
        return true;
    }
    async logout(refreshToken) {
        await this.tokenRepository.delete({ refreshToken: refreshToken });
    }
    async logoutAll(userId) {
        await this.tokenRepository.delete({ userId: Number(userId) });
    }
    async findAllTokens(userId) {
        const tokens = await this.tokenRepository.find({ where: { userId: Number(userId) } });
        return tokens;
    }
    async removeRefreshTokenFamilyIfCompromised(userId, tokenFamily) {
        const familyTokens = await this.tokenRepository.count({ where: { userId: Number(userId), family: tokenFamily } });
        if (familyTokens > 0) {
            await this.tokenRepository.delete({ userId: Number(userId), family: tokenFamily });
        }
    }
    async rotateRefreshToken(refreshToken, refreshTokenContent, browserInfo) {
        await this.tokenRepository.delete({ refreshToken: refreshToken });
        const newRefreshToken = await this.createRefreshToken({
            sub: refreshTokenContent.sub,
            tokenFamily: refreshTokenContent.tokenFamily,
        }, browserInfo);
        return newRefreshToken;
    }
    async getUserRole(userId) {
        const user = await this.usersService.findById(userId);
        return user.role;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.tbl_token)),
    __param(3, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Connection])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map