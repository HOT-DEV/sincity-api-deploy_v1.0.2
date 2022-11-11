import { ProductService } from './product.service';
import { WebinarService } from '../webinar/webinar.service';
import { Request } from 'express';
import { tbl_products } from './product.entity';
export declare class ProductController {
    private readonly productService;
    private readonly webinarService;
    constructor(productService: ProductService, webinarService: WebinarService);
    getManufacturerAll(): Promise<any>;
    getPopularProducts(request: Request): Promise<any>;
    getProducts(request: Request): Promise<any>;
    getProductById(request: Request): Promise<any>;
    getAll(): Promise<any>;
    getBySku(sku: string): Promise<tbl_products>;
}
