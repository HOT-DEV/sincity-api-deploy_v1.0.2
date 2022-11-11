"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const category_module_1 = require("./category/category.module");
const product_module_1 = require("./product/product.module");
const webinar_module_1 = require("./webinar/webinar.module");
const message_module_1 = require("./message/message.module");
const common_module_1 = require("./common/common.module");
const product_entity_1 = require("./product/product.entity");
const users_entity_1 = require("./users/users.entity");
const webinar_entity_1 = require("./webinar/webinar.entity");
const webinar_theme_entity_1 = require("./webinar/webinar-theme.entity");
const seat_booking_entity_1 = require("./webinar/seat-booking.entity");
const webinar_voting_entity_1 = require("./webinar/webinar-voting.entity");
const category_entity_1 = require("./category/category.entity");
const message_entity_1 = require("./message/message.entity");
const users_entity_2 = require("./users/users.entity");
const config_1 = require("./config");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', config_1.assetsConfig.storagePath),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: config_1.databaseConfig.host,
                port: config_1.databaseConfig.port,
                username: config_1.databaseConfig.username,
                password: config_1.databaseConfig.password,
                database: config_1.databaseConfig.database,
                entities: [
                    product_entity_1.tbl_products,
                    users_entity_1.tbl_users,
                    webinar_entity_1.tbl_webinars,
                    webinar_theme_entity_1.tbl_webinar_themes,
                    seat_booking_entity_1.tbl_seat_booking,
                    webinar_voting_entity_1.tbl_webinar_voting,
                    category_entity_1.tbl_category,
                    message_entity_1.tbl_message,
                    users_entity_2.tbl_token
                ],
                synchronize: true,
            }),
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            webinar_module_1.WebinarModule,
            message_module_1.MessageModule,
            auth_module_1.AuthModule,
            common_module_1.CommonModule,
            users_module_1.UsersModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map