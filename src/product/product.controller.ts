import { Controller, Get, Post, All, Param, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { WebinarService } from '../webinar/webinar.service';
import { Product } from '../interfaces';
import { Request } from 'express';
import { tbl_products } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly webinarService: WebinarService
    ) {}

    @All('/getManufacturerAll')
    getManufacturerAll(): Promise<any> {
        return this.productService.getManufacturerAll();
    }

    @All('/getPopularProducts')
    async getPopularProducts(@Req() request: Request): Promise<any> {
        if (!request.body.limit) request.body.limit = 5;
        return await this.productService.getProductsByQuery(request.body);
    }

    @All('/getProducts')
    async getProducts(@Req() request: Request): Promise<any> {
        return await this.productService.getProductsByQuery(request.body);
    }

    @All('/getProductById')
    async getProductById(@Req() request: Request): Promise<any> {
        return await this.productService.getProductDetailById((request.body.id ? request.body.id : null));
    }

    /**
     * GetAll Product
     * @returns Product JSON Array
     */
    @All('/getAll')
    getAll(): Promise<any> {
        return this.productService.getAll();
    }

    @All('/getBySku/:sku')
    getBySku(@Param('sku') sku: string): Promise<tbl_products> {
        return this.productService.getBySku(sku);
    }

    // @Post('/testInsert')
    // testInsert(): Promise<void> {
    //     return this.productService.testInsert();
    // }

}