import { Timestamp } from 'Typeorm';
export declare class tbl_users {
    id?: Number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    preferredMethod?: string;
    token?: string;
    address: string;
    address2?: string;
    city: string;
    stateCode: string;
    countryCode: string;
    avatar: string;
    bio?: string;
    badges?: string;
    badgesArr?: string;
    tags?: string;
    status?: string;
    role?: string;
    emailVerifyLink?: string;
    resetPasswordLink?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}
export declare class tbl_token {
    id: Number;
    userId: number;
    refreshToken: string;
    family: string;
    browserInfo?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}
