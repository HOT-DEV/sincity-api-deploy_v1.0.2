"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetsConfig = exports.databaseConfig = exports.refreshJwtConfig = exports.accessJwtConfig = void 0;
exports.accessJwtConfig = {
    secret: 'sincityAccessJwtKey',
    expiresIn: '15m',
};
exports.refreshJwtConfig = {
    secret: 'sincityRefreshJwtKey',
    expiresIn: '90d',
};
exports.databaseConfig = {
    host: '142.4.26.156',
    port: 3306,
    username: 'sinciua8_db',
    password: 'sincity_database',
    database: 'sinciua8_sincity'
};
exports.assetsConfig = {
    storagePath: './assets'
};
//# sourceMappingURL=index.js.map