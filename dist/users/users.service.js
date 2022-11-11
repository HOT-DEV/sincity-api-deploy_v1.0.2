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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const users_entity_2 = require("./users.entity");
const typeorm_2 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    constructor(usersRepository, tokenRepository, connection, dataSource) {
        this.usersRepository = usersRepository;
        this.tokenRepository = tokenRepository;
        this.connection = connection;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.usersRepository.find();
    }
    async findByEmail(email) {
        const lowerCaseEmail = email.toLowerCase();
        return await this.usersRepository.findOne({ where: { email: lowerCaseEmail } });
    }
    async findById(id) {
        return await this.usersRepository.findOneById(id);
    }
    async userTokensCreate(data) {
        return await this.dataSource.createQueryBuilder().insert().into(users_entity_2.tbl_token).values(data).execute();
    }
    async testInsert() {
        let testInsertData = [];
        for (let i = 0; i < 100; i++) {
            testInsertData.push({
                firstName: `FirsttName - ${i + 1}`,
                lastName: `LastName - ${i + 1}`,
                email: `test${i + 1}@example.com`,
                password: `test-password-${i + 1}`,
                address: `Test-Address-${i + 1}`,
                city: `Texas-${i + 1}`,
                avatar: '/img/avatar.png',
                statesCode: 'TX',
                countryCode: 'USA'
            });
        }
        await this.dataSource.createQueryBuilder().insert().into(users_entity_1.tbl_users).values(testInsertData).execute();
    }
    async userCreate(data) {
        return await this.usersRepository.create(data);
    }
    async UserfindById(userId) {
        const user = await this.usersRepository.findOneById(Number(userId));
        delete user.password;
        return Object.assign({}, user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.tbl_users)),
    __param(1, (0, typeorm_2.InjectRepository)(users_entity_2.tbl_token)),
    __param(2, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Connection,
        typeorm_1.DataSource])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map