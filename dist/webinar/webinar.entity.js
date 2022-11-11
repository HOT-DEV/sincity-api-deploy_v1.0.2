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
exports.tbl_webinars = void 0;
const Typeorm_1 = require("Typeorm");
let tbl_webinars = class tbl_webinars {
};
__decorate([
    (0, Typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tbl_webinars.prototype, "id", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_webinars.prototype, "title", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "longtext"
    }),
    __metadata("design:type", String)
], tbl_webinars.prototype, "description", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_webinars.prototype, "productId", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], tbl_webinars.prototype, "votedThemeId", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_webinars.prototype, "countdown", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["draft", "upcoming", "live", "processing", "waiting", "expired"],
        default: "draft"
    }),
    __metadata("design:type", String)
], tbl_webinars.prototype, "status", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_webinars.prototype, "createdAt", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_webinars.prototype, "updatedAt", void 0);
tbl_webinars = __decorate([
    (0, Typeorm_1.Entity)()
], tbl_webinars);
exports.tbl_webinars = tbl_webinars;
//# sourceMappingURL=webinar.entity.js.map