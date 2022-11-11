import { OmitType } from '@nestjs/swagger';
import { tbl_users } from '../users.entity';

/** This entity is the same as
 * <a href="User.html">User</a>
 * but <u>omitting the password field</u>
 */
export class UserWithoutPassword extends OmitType(tbl_users, [
  'password',
] as const) {}
