import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

@Entity()
export class tbl_seat_booking {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    userId: Number

    @Column()
    themeId: Number

    @Column({
        default: 0
    })
    seatIndex: Number

    @Column({
        default: 1
    })
    quantity: Number

    @Column({
        type: "enum",
        enum: ["Available", "Selected", "Taken", "Reserved"],
        default: "available"
    })
    status: String;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Timestamp;

    @Column({
        type: "timestamp",
        nullable: true
    })
    updatedAt?: Timestamp;
}