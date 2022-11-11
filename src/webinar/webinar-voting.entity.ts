import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

@Entity()
export class tbl_webinar_voting {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    webinarThemeId: Number;

    @Column()
    userId: Number;

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