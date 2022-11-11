import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Param,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithoutPassword } from './entities/user-without-password.entity';


@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/testInsert')
  async testInsert(): Promise<void> {
    return this.userService.testInsert();
  }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.userCreate(createUserDto);
  }

  @Post('/getuserinfo/:id')
  async findById(@Param('id') id: string): Promise<UserWithoutPassword> {

    return this.userService.UserfindById(Number(id));
  }
}