import { Injectable } from '@nestjs/common';
import { Repository, Connection, DataSource } from 'typeorm';
import { tbl_products } from './product.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { InvalidProductIdException } from './exceptions/invalid-product-id.exception';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(tbl_products)
        private productRepository: Repository<tbl_products>,
        @InjectConnection()
        private readonly connection: Connection,
        private readonly dataSource: DataSource
    ) {}

    private async getProductQueryRunner(before?: any, after?: any): Promise<any> {
        const SQLquery = `
            SELECT 	
                p.id 			        AS id,
                p.title 			    AS title,
                p.price                 AS price,
                p.category 			    AS categoryId,
                c.title                 AS category,
                p.manufacturer          AS manufacturer,
                p.imageURLs             AS imageURLs,
                p.status                AS status,
                p.description           AS description,
                p.createdAt 		    AS createdAt
            FROM 	
                tbl_products AS p
            INNER JOIN
                tbl_category AS c
                ON p.category = c.id
            ${ before ? before : "" }
            ORDER BY 
                p.createdAt DESC
            ${ after ? after : "" }
            `;
        
        return await this.dataSource.query(SQLquery);
    }

    async getProducts(): Promise<any> {
        const result = this.getProductQueryRunner();
        return this.buildProductArray(result);
    }

    private buildProductArray(result?: any, isDebugMode?: boolean) {
        /**
         * Debug
         */
        if(isDebugMode) return result;

        if (result) {

            let TempResult = [];

            result.map(item => {
                TempResult.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    manufacturer: item.manufacturer,
                    imageURLs: item.imageURLs.split(','),
                    categoryId: item.categoryId, 
                    category: item.category,
                    description: item.description,
                    status: item.status,
                    createdAt: item.createdAt
                });
            });
            
            return TempResult;

        } else return [];
    }

    async getProductDetailById(id: Number) {
        
        const buildWhereQuery = (id: Number) => {
            let SQLWhereQuery = '';
            if (id!= null) 
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `p.id = '${id}'`;
            return SQLWhereQuery;
        }

        const buildWhereNotQuery = (id?: Number, category?: any) => {
            let SQLWhereQuery = '';
            if (id != null) 
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `p.id != '${id}'`;
            if (category != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `p.category = '${category}'`;
            return SQLWhereQuery;
        }

        const buildLimiQuery = (limit: Number, offset?: Number) => {
            let SQLLimiQuery = '';
            if (limit!= null) 
                SQLLimiQuery += `limit ${ limit } ${ (offset ? ` OFFSET ${ offset }` : '') } `;
            return SQLLimiQuery;
        }

        let resultOne = this.buildProductArray( 
            await this.getProductQueryRunner( 
                buildWhereQuery(
                    id
                ) 
            )
        );

        if (resultOne.length == 0) throw new InvalidProductIdException();

        let resultRelated = this.buildProductArray( 
            await this.getProductQueryRunner( 
                buildWhereNotQuery(
                    id, 
                    resultOne[0]?.categoryId 
                ),
                buildLimiQuery(
                    5
                ) 
            ) 
        );

        resultOne[0].relatedProducts = resultRelated;
        let result = resultOne[0];

        return result;
    }

    async getProductsByQuery(body?: any): Promise<any> {

        const buildWhereQuery = (status?: any, categoryId?: any) => {
            let SQLWhereQuery = '';
            if (status != null) 
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `p.status = '${status}'`;
            if (categoryId != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `p.category = '${categoryId}'`;
            return SQLWhereQuery;
        }

        const buildLimiQuery = (limit: Number, offset?: Number) => {
            let SQLLimiQuery = '';
            if (limit!= null) 
                SQLLimiQuery += `limit ${ limit } ${ (offset ? ` OFFSET ${ offset }` : '') } `;
            return SQLLimiQuery;
        }

        const result = this.buildProductArray(await this.getProductQueryRunner(
            buildWhereQuery( (body.status ? body.status : null), (body.category ? body.category : null) ), 
            buildLimiQuery( (body.limit ? body.limit : null), (body.offset ? body.offset : null) ),
            /**
             * SQL Debug
             */
            // true
        ));
        

        return result;
    }

    async getManufacturerAll(): Promise<any> {
        const SQLquery = `
            SELECT manufacturer AS title FROM tbl_products GROUP BY manufacturer ORDER BY manufacturer
        `;
        return await this.dataSource.query(SQLquery);
    }

    async getAll(): Promise<tbl_products[]> {
        return await this.productRepository.find();
    }

    async getBySku(sku): Promise<tbl_products> {
        return sku;
    }

    async testInsert(): Promise<void> {
        let testInsertData = [];
        for (let i = 0; i < 1000; i++) {
            testInsertData.push({
                title: "test-product-" + (i + 1), // (1 ~ 1000)
                description: 'This is a test product descriptoin - ' + (i + 1), // (1 ~ 1000)
                imageURLs: `/img/img(${Math.floor(Math.random() * 214) + 1}).png`, // (/img/img(1).png ~ /img/img(214).png)
                category: Math.floor(Math.random() * 5) + 1, // (1 ~ 5)
                price: (Math.floor(Math.random() * 200) + 300) * 10, // (3000 ~ 5000)
                manufacturer: "Test Manufacturer" + (Math.floor(Math.random() * 100) + 1), // (1 ~ 100)
                stock: (Math.floor(Math.random() * 20) + 2), // (2 ~ 21)
                status: 'active'
            });            
        }
        await this.dataSource.createQueryBuilder().insert().into(tbl_products).values(testInsertData).execute();
    }

}