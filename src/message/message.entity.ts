import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

export type status = "draft" | "active"

@Entity()
export class tbl_message {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    sender: Number

    @Column()
    target: Number

    @Column({
        type: "longtext"
    })
    message: String

    @Column({
        type: "enum",
        enum: ["yes", "no"],
        default: "no"
    })
    isRead: Boolean

    @Column({
        type: "enum",
        enum: ["yes", "no"],
        default: "no"
    })
    isDeletedForSender: Boolean

    @Column({
        type: "enum",
        enum: ["yes", "no"],
        default: "no"
    })
    isDeletedForReceiver: string 

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Timestamp;

    @Column({
        type: "timestamp",
        nullable: true
    })
    updatedAt?: Timestamp;
}