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
exports.tbl_webinar_themes = void 0;
const Typeorm_1 = require("Typeorm");
let tbl_webinar_themes = class tbl_webinar_themes {
};
__decorate([
    (0, Typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tbl_webinar_themes.prototype, "id", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["High Odds", "Low Odds", "Mixed Odds"],
        default: "High Odds"
    }),
    __metadata("design:type", String)
], tbl_webinar_themes.prototype, "type", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_webinar_themes.prototype, "webinarId", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_webinar_themes.prototype, "totalSeatsCount", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "double"
    }),
    __metadata("design:type", Number)
], tbl_webinar_themes.prototype, "price", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "longtext"
    }),
    __metadata("design:type", String)
], tbl_webinar_themes.prototype, "description", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], tbl_webinar_themes.prototype, "votingCount", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], tbl_webinar_themes.prototype, "remainingSeatsCount", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], tbl_webinar_themes.prototype, "reservedSeatsCount", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "boolean",
        default: false
    }),
    __metadata("design:type", String)
], tbl_webinar_themes.prototype, "isVoted", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_webinar_themes.prototype, "createdAt", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_webinar_themes.prototype, "updatedAt", void 0);
tbl_webinar_themes = __decorate([
    (0, Typeorm_1.Entity)()
], tbl_webinar_themes);
exports.tbl_webinar_themes = tbl_webinar_themes;
//# sourceMappingURL=webinar-theme.entity.js.map