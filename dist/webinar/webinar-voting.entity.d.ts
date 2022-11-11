import { Timestamp } from 'Typeorm';
export declare class tbl_webinar_voting {
    id: Number;
    webinarThemeId: Number;
    userId: Number;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}
