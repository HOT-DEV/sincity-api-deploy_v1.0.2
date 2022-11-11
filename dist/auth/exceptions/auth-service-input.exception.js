"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceInputException = void 0;
const common_1 = require("@nestjs/common");
class AuthServiceInputException extends common_1.NotFoundException {
    constructor(message) {
        super(message);
    }
}
exports.AuthServiceInputException = AuthServiceInputException;
//# sourceMappingURL=auth-service-input.exception.js.map