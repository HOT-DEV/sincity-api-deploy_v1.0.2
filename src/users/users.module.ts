import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbl_users } from './users.entity';
import { tbl_token } from './users.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([tbl_users,tbl_token]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
