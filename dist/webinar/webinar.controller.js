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
exports.WebinarController = void 0;
const common_1 = require("@nestjs/common");
const webinar_service_1 = require("./webinar.service");
let WebinarController = class WebinarController {
    constructor(webinarService) {
        this.webinarService = webinarService;
    }
    async getWebinar(request) {
        return await this.webinarService.getWebinarDetailById((request.body.id ? request.body.id : null));
    }
    async getWebinars(request) {
        return await this.webinarService.getWebinarsByQuery(request.body);
    }
    async getPopularWebinars(request) {
        if (!request.body.limit)
            request.body.limit = 5;
        return await this.webinarService.getWebinarsByQuery(request.body);
    }
};
__decorate([
    (0, common_1.All)('/getWebinarById'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebinarController.prototype, "getWebinar", null);
__decorate([
    (0, common_1.All)('/getWebinars'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebinarController.prototype, "getWebinars", null);
__decorate([
    (0, common_1.All)('/getPopularWebinars'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebinarController.prototype, "getPopularWebinars", null);
WebinarController = __decorate([
    (0, common_1.Controller)('webinar'),
    __metadata("design:paramtypes", [webinar_service_1.WebinarService])
], WebinarController);
exports.WebinarController = WebinarController;
//# sourceMappingURL=webinar.controller.js.map