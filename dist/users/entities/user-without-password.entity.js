"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithoutPassword = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../users.entity");
class UserWithoutPassword extends (0, swagger_1.OmitType)(users_entity_1.tbl_users, [
    'password',
]) {
}
exports.UserWithoutPassword = UserWithoutPassword;
//# sourceMappingURL=user-without-password.entity.js.map