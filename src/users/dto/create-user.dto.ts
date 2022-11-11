import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength
} from 'class-validator';
import { isNumber } from 'util';

import { tbl_users } from '../users.entity';

export class CreateUserDto implements tbl_users {

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail({ message: 'Must be an e-mail' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must have length of at least 8' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 number and 1 letter',
  })
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string

  @IsString()
  stateCode: string

  @IsString()
  countryCode: string

  @IsString()
  avatar: string
}