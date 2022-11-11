"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebinarServiceException = void 0;
const common_1 = require("@nestjs/common");
class WebinarServiceException extends common_1.NotFoundException {
    constructor(message) {
        super(message);
    }
}
exports.WebinarServiceException = WebinarServiceException;
//# sourceMappingURL=webinar.exceptions.js.map