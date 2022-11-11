import { tbl_users } from '../users.entity';
export declare class CreateUserDto implements tbl_users {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    stateCode: string;
    countryCode: string;
    avatar: string;
}
