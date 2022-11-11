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
exports.tbl_message = void 0;
const Typeorm_1 = require("Typeorm");
let tbl_message = class tbl_message {
};
__decorate([
    (0, Typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tbl_message.prototype, "id", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_message.prototype, "sender", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_message.prototype, "target", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "longtext"
    }),
    __metadata("design:type", String)
], tbl_message.prototype, "message", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["yes", "no"],
        default: "no"
    }),
    __metadata("design:type", Boolean)
], tbl_message.prototype, "isRead", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["yes", "no"],
        default: "no"
    }),
    __metadata("design:type", Boolean)
], tbl_message.prototype, "isDeletedForSender", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["yes", "no"],
        default: "no"
    }),
    __metadata("design:type", String)
], tbl_message.prototype, "isDeletedForReceiver", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_message.prototype, "createdAt", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_message.prototype, "updatedAt", void 0);
tbl_message = __decorate([
    (0, Typeorm_1.Entity)()
], tbl_message);
exports.tbl_message = tbl_message;
//# sourceMappingURL=message.entity.js.map