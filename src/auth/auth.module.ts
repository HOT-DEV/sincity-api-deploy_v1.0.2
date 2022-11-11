import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { tbl_token } from 'src/users/users.entity';
import { tbl_users } from 'src/users/users.entity';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([tbl_users,tbl_token]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}