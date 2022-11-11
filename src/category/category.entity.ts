import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

@Entity()
export class tbl_category {
    /**
     * ID
     * @example 3331 
     */
     @PrimaryGeneratedColumn()
     id: number;

     /**
     * Proudct Title
     * @example SIG Sauer p365X 9mm w/3 MOA Romeo Zero
     */
    @Column()
    title: string;

    /**
     * CreatedAt
     * @example 2022-10-20 13:42:44
     */
     @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Timestamp;

    
    /**
     * UpdatedAt
     * @example 2022-10-20 13:42:44
     */
    @Column({
        type: "timestamp",
        nullable: true
    })
    updatedAt?: Timestamp;
}