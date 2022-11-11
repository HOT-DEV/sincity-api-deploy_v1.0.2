import { tbl_users } from '../users.entity';
declare const UserWithoutPassword_base: import("@nestjs/common").Type<Omit<tbl_users, "password">>;
export declare class UserWithoutPassword extends UserWithoutPassword_base {
}
export {};
