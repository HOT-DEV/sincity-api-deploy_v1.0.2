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
exports.WebinarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const webinar_entity_1 = require("./webinar.entity");
const webinar_theme_entity_1 = require("./webinar-theme.entity");
const typeorm_2 = require("@nestjs/typeorm");
const invalid_webinar_id_exception_1 = require("./exceptions/invalid-webinar-id.exception");
let WebinarService = class WebinarService {
    constructor(connection, dataSource) {
        this.connection = connection;
        this.dataSource = dataSource;
    }
    async getWebinars(before, after, isDebugMode) {
        let SQLquery = `
            SELECT 	
                w.id 			        AS webinarId, 
                w.title 			    AS webinarTitle,
                p.id 			        AS productId,
                p.title 			    AS productTitle,
                p.category 			    AS categoryId,
                c.title                 AS category,
                p.manufacturer          AS manufacturer,
                p.imageURLs             AS productImages,
                p.price                 AS productPrice,
                p.priceDiscount         AS discountPrice,
                t.type 			        AS themeType,
                t.id			        AS themeId,
                t.totalSeatsCount		AS totalCount,
                t.price			        AS price,
                t.votingCount		    AS votingCount,
                t.remainingSeatsCount	AS remainingCount,
                t.description		    AS themeDescription,
                t.isVoted               AS isVoted,
                w.votedThemeId		    AS votedThemeId,
                w.description		    AS webinarDescription,
                w.status			    AS webinarstatus,
                w.countdown			    AS countdown,
                w.createdAt 		    AS createdAt
            FROM 	
                tbl_webinar_themes AS t
            INNER JOIN
                tbl_webinars AS w 
                ON t.webinarId = w.id
            INNER JOIN
                tbl_products AS p 
                ON w.productId = p.id
            INNER JOIN
                tbl_category AS c
                ON p.category = c.id
            ${(before ? before : '')}
            ORDER BY 
                w.createdAt DESC, t.webinarId, t.id 
            ${(after ? after : '')};`;
        if (isDebugMode)
            return SQLquery;
        return await this.dataSource.query(SQLquery);
    }
    async getWebinarsByQuery(body) {
        const buildWhereQuery = (status, categoryId) => {
            let SQLWhereQuery = '';
            if (status != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `w.status = '${status}'`;
            if (categoryId != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `p.category = '${categoryId}'`;
            return SQLWhereQuery;
        };
        const buildLimiQuery = (limit, offset) => {
            let SQLLimiQuery = '';
            if (limit != null)
                SQLLimiQuery += `limit ${Number(limit) * 3} ${(offset ? ` OFFSET ${Number(offset) * 3}` : '')} `;
            return SQLLimiQuery;
        };
        const result = await this.getWebinars(buildWhereQuery((body.status ? body.status : null), (body.categoryId ? body.categoryId : null)), buildLimiQuery((body.limit ? body.limit : null), (body.offset ? body.offset : null)));
        return this.buildWebinarArray(result);
    }
    buildWebinarArray(result, isDebugMode) {
        if (isDebugMode)
            return result;
        if (result) {
            let TempResult = [];
            result.map(item => {
                let TempItemIndex = TempResult.findIndex(element => element.id == item.webinarId);
                if (TempItemIndex != -1) {
                    TempResult[TempItemIndex].themes.push({
                        id: item.themeId,
                        type: item.themeType,
                        seatsCount: item.totalCount,
                        price: item.price,
                        votersCount: item.votingCount,
                        remaingSeatsCount: item.remainingCount,
                        themeDescription: item.themeDescription,
                        voted: item.isVoted == 1
                    });
                }
                else {
                    TempResult.push({
                        id: item.webinarId,
                        title: item.webinarTitle,
                        product: {
                            id: item.productId,
                            title: item.productTitle,
                            price: item.productPrice,
                            discountPrice: item.discountPrice,
                            manufacturer: item.manufacturer,
                            imageURLs: item.productImages.split(','),
                            categoryId: item.categoryId,
                            category: item.category,
                        },
                        themes: [
                            {
                                id: item.themeId,
                                type: item.themeType,
                                seatsCount: item.totalCount,
                                price: item.price,
                                votersCount: item.votingCount,
                                remaingSeatsCount: item.remainingCount,
                                description: item.themeDescription,
                                voted: item.isVoted == 1
                            }
                        ],
                        votedThemeId: item.votedThemeId,
                        description: item.webinarDescription,
                        status: item.webinarstatus,
                        countdown: item.countdown,
                        createdAt: item.createdAt
                    });
                }
            });
            return TempResult;
        }
        else
            return [];
    }
    async getWebinarDetailById(id) {
        var _a;
        const buildWhereQuery = (id) => {
            let SQLWhereQuery = '';
            if (id != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `w.id = '${id}'`;
            return SQLWhereQuery;
        };
        const buildWhereNotQuery = (id, category) => {
            let SQLWhereQuery = '';
            if (id != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `w.id != '${id}'`;
            if (category != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `c.id = '${category}'`;
            return SQLWhereQuery;
        };
        const buildLimiQuery = (limit, offset) => {
            let SQLLimiQuery = '';
            if (limit != null)
                SQLLimiQuery += `limit ${Number(limit) * 3} ${(offset ? ` OFFSET ${Number(offset) * 3}` : '')} `;
            return SQLLimiQuery;
        };
        let resultOne = this.buildWebinarArray(await this.getWebinars(buildWhereQuery(id)));
        if (resultOne.length == 0)
            throw new invalid_webinar_id_exception_1.InvalidWebinarIdException();
        let resultRelated = this.buildWebinarArray(await this.getWebinars(buildWhereNotQuery(id, (_a = resultOne[0]) === null || _a === void 0 ? void 0 : _a.product.categoryId), buildLimiQuery(5)));
        resultOne[0].relatedWebinars = resultRelated;
        let result = resultOne[0];
        delete resultOne[0];
        const VotedThemeIndex = result.themes.findIndex(item => item.voted == true && (item.type == 'High Odds' || item.type == 'Mixed Odds'));
        let TempSeatsData = [];
        if (VotedThemeIndex > -1) {
            let Seatsdata = await this.getSeatsData(VotedThemeIndex);
            for (let i = 0; i < result.themes[VotedThemeIndex].seatsCount; i++) {
                if (Seatsdata.find(element => element.number == i))
                    TempSeatsData.push(Seatsdata.find(element => element.number == i));
                else
                    TempSeatsData.push({
                        userId: null,
                        themeId: result.themes[VotedThemeIndex].id,
                        number: i,
                        status: "Available",
                        quantity: 1,
                    });
            }
            result.themes[VotedThemeIndex].seats = TempSeatsData;
        }
        return result;
    }
    async getSeatsData(id, isDebugMode) {
        const SQLquery = `
            SELECT 
                s.userId      AS userId,
                s.themeId     AS themeId,
                s.seatIndex   AS number,
                s.status      AS status,
                s.quantity    AS quantity
            FROM
                tbl_seat_booking as s
            WHERE
                s.themeId = ${id}
            ORDER BY
                s.createdAt, s.userId, s.themeId
        `;
        if (isDebugMode)
            return SQLquery;
        return await this.dataSource.query(SQLquery);
    }
    async getAll() {
        return this.connection.query('SELECT * FROM `tbl_webinars`;');
    }
    async testInsertWebinarTheme(votedThemeIds) {
        let testInsertData = [];
        let type = ["High Odds", "Mixed Odds", "Low Odds"];
        let highThemeSeats = [30, 20, 25, 15, 10];
        let lowThemeSeats = [80, 90, 100, 120, 150];
        let mixThemeSeats = [30, 35, 40, 45, 50];
        for (let i = 0; i < 1000; i++) {
            let votedThemeType = null;
            if (votedThemeIds[i])
                votedThemeType = type[(votedThemeIds[i] - 1) % 3];
            let tempThemeSeatIndex = Math.floor(Math.random() * 5);
            testInsertData.push({
                type: type[0],
                webinarId: i + 1,
                isVoted: type[0] == votedThemeType,
                totalSeatsCount: highThemeSeats[tempThemeSeatIndex],
                remainingSeatsCount: highThemeSeats[tempThemeSeatIndex],
                price: 4000 / highThemeSeats[tempThemeSeatIndex],
                description: "This is a test Description for testing - " + i,
            });
            tempThemeSeatIndex = Math.floor(Math.random() * 3);
            testInsertData.push({
                type: type[1],
                webinarId: i + 1,
                isVoted: type[1] == votedThemeType,
                totalSeatsCount: lowThemeSeats[tempThemeSeatIndex],
                remainingSeatsCount: lowThemeSeats[tempThemeSeatIndex],
                price: 3500 / lowThemeSeats[tempThemeSeatIndex],
                description: "This is a test Description for testing - " + i,
            });
            tempThemeSeatIndex = Math.floor(Math.random() * 5);
            testInsertData.push({
                type: type[2],
                webinarId: i + 1,
                isVoted: type[2] == votedThemeType,
                totalSeatsCount: mixThemeSeats[tempThemeSeatIndex],
                remainingSeatsCount: mixThemeSeats[tempThemeSeatIndex],
                price: 5000 / mixThemeSeats[tempThemeSeatIndex],
                description: "This is a test Description for testing - " + i,
            });
        }
        await this.dataSource.createQueryBuilder().insert().into(webinar_theme_entity_1.tbl_webinar_themes).values(testInsertData).execute();
    }
    async testInsertWebinar() {
        let votedThemeIds = [];
        let type = ["High Odds", "Mixed Odds", "Low Odds"];
        let testInsertData = [];
        let status = ["upcoming", "live"];
        for (let i = 0; i < 1000; i++) {
            let statusIndex = Math.floor(Math.random() * 2);
            let votedThemeId = null;
            if (statusIndex != 0)
                votedThemeId = Math.floor(Math.random() * 3) + 1 + i * 3;
            votedThemeIds.push(votedThemeId);
            testInsertData.push({
                description: 'this is a test descriptoin for testing',
                productId: Math.floor(Math.random() * 1000) + 1,
                votedThemeId: votedThemeId,
                status: status[statusIndex],
                title: "Test Webinar " + i
            });
        }
        await this.dataSource.createQueryBuilder().insert().into(webinar_entity_1.tbl_webinars).values(testInsertData).execute();
        await this.testInsertWebinarTheme(votedThemeIds);
    }
};
WebinarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        typeorm_1.DataSource])
], WebinarService);
exports.WebinarService = WebinarService;
//# sourceMappingURL=webinar.service.js.map