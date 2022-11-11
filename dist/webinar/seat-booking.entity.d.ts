import { Timestamp } from 'Typeorm';
export declare class tbl_seat_booking {
    id: Number;
    userId: Number;
    themeId: Number;
    seatIndex: Number;
    quantity: Number;
    status: String;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}
