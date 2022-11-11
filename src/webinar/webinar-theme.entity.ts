import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

@Entity()
export class tbl_webinar_themes {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({
        type: "enum",
        enum: ["High Odds", "Low Odds", "Mixed Odds"],
        default: "High Odds"
    })
    type: String;

    @Column()
    webinarId: Number;

    @Column()
    totalSeatsCount: Number;

    @Column({
        type: "double"
    })
    price: Number;

    @Column({
        type: "longtext"  
    })
    description: String;

    @Column({
        default: 0
    })
    votingCount: Number

    @Column({
        default: 0
    })
    remainingSeatsCount: Number

    @Column({
        default: 0
    })
    reservedSeatsCount: Number

    @Column({
        type: "boolean",
        default: false
    })
    isVoted: String

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