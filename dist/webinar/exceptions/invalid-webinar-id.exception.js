"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidWebinarIdException = void 0;
const webinar_exceptions_1 = require("./webinar.exceptions");
class InvalidWebinarIdException extends webinar_exceptions_1.WebinarServiceException {
    constructor() {
        super('Not found Webinar, invalid ID!');
    }
}
exports.InvalidWebinarIdException = InvalidWebinarIdException;
//# sourceMappingURL=invalid-webinar-id.exception.js.map