import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

@Entity()
export class tbl_users {
    @PrimaryGeneratedColumn()
    id?: Number;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: ["email", "phone"],
        default: "email"
    })
    preferredMethod?: string

    @Column({
        length: 1024,
        nullable: true
    })
    token?: string

    @Column()
    address: string

    @Column({
        nullable: true
    })
    address2?: string

    @Column()
    city: string

    @Column()
    stateCode: string

    @Column()
    countryCode: string

    @Column()
    avatar: string

    @Column({
        type: "longtext",
        nullable: true
    })
    bio?: string

    @Column({
        nullable: true
    })
    badges?: string

    @Column({
        nullable: true
    })
    badgesArr?: string

    @Column({
        nullable: true
    })
    tags?: string

    @Column({
        type: "enum",
        enum: ["active", "unactive", "restricted", "suspended"],
        default: "unactive"
    })
    status?: string

    @Column({
        type: "enum",
        enum: ["admin", "user"],
        default: "user"
    })
    role?: string

    @Column({
        length: 1024,
        nullable: true
    })
    emailVerifyLink?: string

    @Column({
        length: 1024,
        nullable: true
    })
    resetPasswordLink?: string
 
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt?: Timestamp;

    @Column({
        type: "timestamp",
        nullable: true
    })
    updatedAt?: Timestamp;
}

@Entity()
export class tbl_token {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    userId: number

    @Column({
        length: 1024
    })
    refreshToken: string

    @Column({
        length: 1024
    })
    family: string

    @Column({
        length: 1024
    })
    browserInfo?: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt?: Timestamp;

    @Column({
        type: "timestamp",
        nullable: true
    })
    updatedAt?: Timestamp;
}