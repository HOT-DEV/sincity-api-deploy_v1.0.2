import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

@Entity()
export class tbl_webinars {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    title: String;

    @Column({
        type: "longtext"
    })
    description: String;

    @Column()
    productId: Number;

    @Column({
        nullable: true
    })
    votedThemeId?: Number;

    @Column({
        nullable: true
    })
    countdown?: string;
    
    @Column({
        type: "enum",
        enum: ["draft", "upcoming", "live", "processing", "waiting", "expired"],
        default: "draft"
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