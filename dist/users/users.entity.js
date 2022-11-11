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
exports.tbl_token = exports.tbl_users = void 0;
const Typeorm_1 = require("Typeorm");
let tbl_users = class tbl_users {
};
__decorate([
    (0, Typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tbl_users.prototype, "id", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "firstName", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "lastName", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "email", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "phone", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "password", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["email", "phone"],
        default: "email"
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "preferredMethod", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "token", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "address", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "address2", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "city", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "stateCode", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "countryCode", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", String)
], tbl_users.prototype, "avatar", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "longtext",
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "bio", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "badges", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "badgesArr", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "tags", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["active", "unactive", "restricted", "suspended"],
        default: "unactive"
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "status", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["admin", "user"],
        default: "user"
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "role", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "emailVerifyLink", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], tbl_users.prototype, "resetPasswordLink", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_users.prototype, "createdAt", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_users.prototype, "updatedAt", void 0);
tbl_users = __decorate([
    (0, Typeorm_1.Entity)()
], tbl_users);
exports.tbl_users = tbl_users;
let tbl_token = class tbl_token {
};
__decorate([
    (0, Typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tbl_token.prototype, "id", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_token.prototype, "userId", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        length: 1024
    }),
    __metadata("design:type", String)
], tbl_token.prototype, "refreshToken", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        length: 1024
    }),
    __metadata("design:type", String)
], tbl_token.prototype, "family", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        length: 1024
    }),
    __metadata("design:type", String)
], tbl_token.prototype, "browserInfo", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_token.prototype, "createdAt", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_token.prototype, "updatedAt", void 0);
tbl_token = __decorate([
    (0, Typeorm_1.Entity)()
], tbl_token);
exports.tbl_token = tbl_token;
//# sourceMappingURL=users.entity.js.map