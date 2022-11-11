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
exports.tbl_seat_booking = void 0;
const Typeorm_1 = require("Typeorm");
let tbl_seat_booking = class tbl_seat_booking {
};
__decorate([
    (0, Typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], tbl_seat_booking.prototype, "id", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_seat_booking.prototype, "userId", void 0);
__decorate([
    (0, Typeorm_1.Column)(),
    __metadata("design:type", Number)
], tbl_seat_booking.prototype, "themeId", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], tbl_seat_booking.prototype, "seatIndex", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        default: 1
    }),
    __metadata("design:type", Number)
], tbl_seat_booking.prototype, "quantity", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "enum",
        enum: ["Available", "Selected", "Taken", "Reserved"],
        default: "available"
    }),
    __metadata("design:type", String)
], tbl_seat_booking.prototype, "status", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_seat_booking.prototype, "createdAt", void 0);
__decorate([
    (0, Typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Typeorm_1.Timestamp)
], tbl_seat_booking.prototype, "updatedAt", void 0);
tbl_seat_booking = __decorate([
    (0, Typeorm_1.Entity)()
], tbl_seat_booking);
exports.tbl_seat_booking = tbl_seat_booking;
//# sourceMappingURL=seat-booking.entity.js.map