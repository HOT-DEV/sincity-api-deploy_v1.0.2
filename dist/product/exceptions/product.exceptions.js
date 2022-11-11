"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServiceException = void 0;
const common_1 = require("@nestjs/common");
class ProductServiceException extends common_1.NotFoundException {
    constructor(message) {
        super(message);
    }
}
exports.ProductServiceException = ProductServiceException;
//# sourceMappingURL=product.exceptions.js.map