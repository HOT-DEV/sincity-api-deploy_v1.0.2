import { Timestamp } from 'Typeorm';
export declare class tbl_webinars {
    id: Number;
    title: String;
    description: String;
    productId: Number;
    votedThemeId?: Number;
    countdown?: string;
    status: String;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}
