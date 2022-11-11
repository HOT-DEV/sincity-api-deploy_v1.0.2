"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("@nestjs/typeorm");
const invalid_product_id_exception_1 = require("./exceptions/invalid-product-id.exception");
let ProductService = class ProductService {
    constructor(productRepository, connection, dataSource) {
        this.productRepository = productRepository;
        this.connection = connection;
        this.dataSource = dataSource;
    }
    async getProductQueryRunner(before, after) {
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
            ${before ? before : ""}
            ORDER BY 
                p.createdAt DESC
            ${after ? after : ""}
            `;
        return await this.dataSource.query(SQLquery);
    }
    async getProducts() {
        const result = this.getProductQueryRunner();
        return this.buildProductArray(result);
    }
    buildProductArray(result, isDebugMode) {
        if (isDebugMode)
            return result;
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
        }
        else
            return [];
    }
    async getProductDetailById(id) {
        var _a;
        const buildWhereQuery = (id) => {
            let SQLWhereQuery = '';
            if (id != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `p.id = '${id}'`;
            return SQLWhereQuery;
        };
        const buildWhereNotQuery = (id, category) => {
            let SQLWhereQuery = '';
            if (id != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `p.id != '${id}'`;
            if (category != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `p.category = '${category}'`;
            return SQLWhereQuery;
        };
        const buildLimiQuery = (limit, offset) => {
            let SQLLimiQuery = '';
            if (limit != null)
                SQLLimiQuery += `limit ${limit} ${(offset ? ` OFFSET ${offset}` : '')} `;
            return SQLLimiQuery;
        };
        let resultOne = this.buildProductArray(await this.getProductQueryRunner(buildWhereQuery(id)));
        if (resultOne.length == 0)
            throw new invalid_product_id_exception_1.InvalidProductIdException();
        let resultRelated = this.buildProductArray(await this.getProductQueryRunner(buildWhereNotQuery(id, (_a = resultOne[0]) === null || _a === void 0 ? void 0 : _a.categoryId), buildLimiQuery(5)));
        resultOne[0].relatedProducts = resultRelated;
        let result = resultOne[0];
        return result;
    }
    async getProductsByQuery(body) {
        const buildWhereQuery = (status, categoryId) => {
            let SQLWhereQuery = '';
            if (status != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `p.status = '${status}'`;
            if (categoryId != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `p.category = '${categoryId}'`;
            return SQLWhereQuery;
        };
        const buildLimiQuery = (limit, offset) => {
            let SQLLimiQuery = '';
            if (limit != null)
                SQLLimiQuery += `limit ${limit} ${(offset ? ` OFFSET ${offset}` : '')} `;
            return SQLLimiQuery;
        };
        const result = this.buildProductArray(await this.getProductQueryRunner(buildWhereQuery((body.status ? body.status : null), (body.category ? body.category : null)), buildLimiQuery((body.limit ? body.limit : null), (body.offset ? body.offset : null))));
        return result;
    }
    async getManufacturerAll() {
        const SQLquery = `
            SELECT manufacturer AS title FROM tbl_products GROUP BY manufacturer ORDER BY manufacturer
        `;
        return await this.dataSource.query(SQLquery);
    }
    async getAll() {
        return await this.productRepository.find();
    }
    async getBySku(sku) {
        return sku;
    }
    async testInsert() {
        let testInsertData = [];
        for (let i = 0; i < 1000; i++) {
            testInsertData.push({
                title: "test-product-" + (i + 1),
                description: 'This is a test product descriptoin - ' + (i + 1),
                imageURLs: `/img/img(${Math.floor(Math.random() * 214) + 1}).png`,
                category: Math.floor(Math.random() * 5) + 1,
                price: (Math.floor(Math.random() * 200) + 300) * 10,
                manufacturer: "Test Manufacturer" + (Math.floor(Math.random() * 100) + 1),
                stock: (Math.floor(Math.random() * 20) + 2),
                status: 'active'
            });
        }
        await this.dataSource.createQueryBuilder().insert().into(product_entity_1.tbl_products).values(testInsertData).execute();
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.tbl_products)),
    __param(1, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Connection,
        typeorm_1.DataSource])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map