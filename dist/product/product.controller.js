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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const webinar_service_1 = require("../webinar/webinar.service");
let ProductController = class ProductController {
    constructor(productService, webinarService) {
        this.productService = productService;
        this.webinarService = webinarService;
    }
    getManufacturerAll() {
        return this.productService.getManufacturerAll();
    }
    async getPopularProducts(request) {
        if (!request.body.limit)
            request.body.limit = 5;
        return await this.productService.getProductsByQuery(request.body);
    }
    async getProducts(request) {
        return await this.productService.getProductsByQuery(request.body);
    }
    async getProductById(request) {
        return await this.productService.getProductDetailById((request.body.id ? request.body.id : null));
    }
    getAll() {
        return this.productService.getAll();
    }
    getBySku(sku) {
        return this.productService.getBySku(sku);
    }
};
__decorate([
    (0, common_1.All)('/getManufacturerAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getManufacturerAll", null);
__decorate([
    (0, common_1.All)('/getPopularProducts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPopularProducts", null);
__decorate([
    (0, common_1.All)('/getProducts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.All)('/getProductById'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.All)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.All)('/getBySku/:sku'),
    __param(0, (0, common_1.Param)('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getBySku", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        webinar_service_1.WebinarService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map