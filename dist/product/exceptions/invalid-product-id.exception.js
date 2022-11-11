"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidProductIdException = void 0;
const product_exceptions_1 = require("./product.exceptions");
class InvalidProductIdException extends product_exceptions_1.ProductServiceException {
    constructor() {
        super('Not found Webinar, invalid ID!');
    }
}
exports.InvalidProductIdException = InvalidProductIdException;
//# sourceMappingURL=invalid-product-id.exception.js.map