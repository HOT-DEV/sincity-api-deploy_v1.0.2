import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'Typeorm'

export type status = "draft" | "active"

@Entity()
export class tbl_products {

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
     * Product Description
     * @example this is a product
     */
    @Column({
        type: "longtext"
    })
    description: string;


    /**
     * Product Image URLs
     * @example ./img/<categoryId>/<productID>.<extention: png | jpg | gif >
     */
    @Column({
        type: "text"
    })
    imageURLs: string;


    /**
     * Product Category
     * @example 3
     */
    @Column()
    category: number;
    

    /**
     * Product Price
     * @example 280.00
     */
    @Column({
        type: "double"
    })
    price: number;


    /**
     * Product priceDiscount
     * @example 220.00
     */
    @Column({
        type: "double",
        nullable: true
    })
    priceDiscount?: number;


    /**
     * Product Tags for advanced ecommerce features
     * @example wholesale, discountCustomer, ...
     */
    @Column({
        type: "longtext",
        nullable: true
    }) 
    tags?: string;


    /**
     * Product Manufacturer
     * @example SIG Sauer
     */
    @Column()
    manufacturer: string;


    /**
     * Product UPC information
     * @example 798681626465
     */
    @Column({
        type: "varchar",
        length: 15,
        nullable: true
    })
    upc?: number;


    /**
     * Product Finish/Color information
     * @example Black
     */
    @Column({
        nullable: true
    })
    finishAndColor?: string;


    /**
     * Product Grips/Stock information
     * @example Polymer X Series P365 Grip Module
     */
    @Column({
        nullable: true
    })
    gripsAndStock?: string;


    /**
     * Product Barrel/Length information
     * @example 3.1
     */
    @Column({
        nullable: true
    })
    barrelAndLength?: string;


    /**
     * Product Type Of Barrel information
     * @example Carbon Steel
     */
    @Column({
        nullable: true
    })
    typeOfBarrel?: string;


    /**
     * Product Action information
     * @example Semi Automatic
     */
    @Column({
        nullable: true
    })
    action?: string;


    /**
     * Product Caliber information
     * @example 9mm
     */
    @Column({
        nullable: true
    })
    caliber?: string;


    /**
     * Product Frame/Material information
     * @example Stainless stell slide w/Nitron Finish
     */
    @Column({
        nullable: true
    })
    frameAndMaterial?: string;


    /**
     * Type of Product
     * @example Striker Fired
     */
    @Column({
        nullable: true
    })
    type?: string;

    
    /**
     * Hand
     * @example right | left
     */
    @Column({
        nullable: true
    })
    hand?: string;


    /**
     * Capacity of product
     * @example 10
     */
    @Column({
        nullable: true
    })
    capacity?: number;


    /**
     * Sights
     * @example SIG Sauer XRAY 3 Tritium Front, Romeo Zero 3MOA MRDS w/ Integrated Co-Witness Rear Sight
     */
    @Column({
        nullable: true
    })
    sights?: string;


    /**
     * Size
     * @example Micro Compact
     */
    @Column({
        nullable: true
    })
    size?: string;

    
    /**
     * Satefy
     * @example Safe Action Trigger System
     */
    @Column({
        nullable: true
    })
    safety?: string;


    /**
     * Model
     * @example G44
     */
    @Column({
        nullable: true
    })
    model?: string;


    /**
     * Metafield data 
     * @example { JSON }
     */
    @Column({
        nullable: true
    })
    meta?: string;


    /**
     * Stock 
     * @example 20
     */
    @Column()
    stock: number;

    /**
     * Status
     * @example draft
     */
    @Column({
        type: "enum",
        enum: ["draft", "active"],
        default: "draft"
    })
    status: string;


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

