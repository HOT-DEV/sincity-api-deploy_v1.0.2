import { Timestamp } from 'Typeorm';
export declare class tbl_webinar_themes {
    id: Number;
    type: String;
    webinarId: Number;
    totalSeatsCount: Number;
    price: Number;
    description: String;
    votingCount: Number;
    remainingSeatsCount: Number;
    reservedSeatsCount: Number;
    isVoted: String;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}
