import { Timestamp } from 'Typeorm';
export declare type status = "draft" | "active";
export declare class tbl_message {
    id: Number;
    sender: Number;
    target: Number;
    message: String;
    isRead: Boolean;
    isDeletedForSender: Boolean;
    isDeletedForReceiver: string;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}
