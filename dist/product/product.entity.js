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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tbl_products = void 0;
const Typeorm_1 = require("Typeorm");
let tbl_products = class tbl_products {
};
__decorate([
    (0, Typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tbl_products.prototype, "id", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_products.prototype, "title", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "longtext"
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "description", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "text"
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "imageURLs", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_products.prototype, "category", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "double"
    }),
    __metadata("design:type", Number)
], tbl_products.prototype, "price", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "double",
        nullable: true
    }),
    __metadata("design:type", Number)
], tbl_products.prototype, "priceDiscount", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "longtext",
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "tags", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_products.prototype, "manufacturer", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "varchar",
        length: 15,
        nullable: true
    }),
    __metadata("design:type", Number)
], tbl_products.prototype, "upc", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "finishAndColor", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "gripsAndStock", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "barrelAndLength", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "typeOfBarrel", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "action", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "caliber", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "frameAndMaterial", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "type", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "hand", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], tbl_products.prototype, "capacity", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "sights", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "size", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "safety", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "model", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "meta", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_products.prototype, "stock", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["draft", "active"],
        default: "draft"
    }),
    __metadata("design:type", String)
], tbl_products.prototype, "status", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_products.prototype, "createdAt", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_products.prototype, "updatedAt", void 0);
tbl_products = __decorate([
    (0, Typeorm_1.Entity)()
], tbl_products);
exports.tbl_products = tbl_products;
//# sourceMappingURL=product.entity.js.map