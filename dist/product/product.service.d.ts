import { Repository, Connection, DataSource } from 'typeorm';
import { tbl_products } from './product.entity';
export declare class ProductService {
    private productRepository;
    private readonly connection;
    private readonly dataSource;
    constructor(productRepository: Repository<tbl_products>, connection: Connection, dataSource: DataSource);
    private getProductQueryRunner;
    getProducts(): Promise<any>;
    private buildProductArray;
    getProductDetailById(id: Number): Promise<any>;
    getProductsByQuery(body?: any): Promise<any>;
    getManufacturerAll(): Promise<any>;
    getAll(): Promise<tbl_products[]>;
    getBySku(sku: any): Promise<tbl_products>;
    testInsert(): Promise<void>;
}
