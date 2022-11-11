import { Injectable } from '@nestjs/common';
import { Repository, Connection, DataSource } from 'typeorm';
import { tbl_webinars } from './webinar.entity';
import { tbl_webinar_themes } from './webinar-theme.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { InvalidWebinarIdException } from './exceptions/invalid-webinar-id.exception';

@Injectable()
export class WebinarService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
        private readonly dataSource: DataSource
    ) {}
    
    private async getWebinars(before?: any, after?: any, isDebugMode?: boolean): Promise<any> {

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
            ${ (before? before : '') }
            ORDER BY 
                w.createdAt DESC, t.webinarId, t.id 
            ${ (after ? after : '') };`

        /**
         * SQL Debug
         */
        if (isDebugMode) return SQLquery;

        return await this.dataSource.query(SQLquery);
    }

    async getWebinarsByQuery(body?: any): Promise<any> {

        const buildWhereQuery = (status?: any, categoryId?: any) => {
            let SQLWhereQuery = '';
            if (status != null) 
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `w.status = '${status}'`;
            if (categoryId != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `p.category = '${categoryId}'`;
            return SQLWhereQuery;
        }

        const buildLimiQuery = (limit: Number, offset?: Number) => {
            let SQLLimiQuery = '';
            if (limit!= null) 
                SQLLimiQuery += `limit ${ Number(limit) * 3 } ${ (offset ? ` OFFSET ${ Number(offset) * 3 }` : '') } `;
            return SQLLimiQuery;
        }

        const result = await this.getWebinars(
            buildWhereQuery( (body.status ? body.status : null), (body.categoryId ? body.categoryId : null) ), 
            buildLimiQuery( (body.limit ? body.limit : null), (body.offset ? body.offset : null) ),
            /**
             * SQL Debug
             */
            // true
        );

        return this.buildWebinarArray(result);
    }

    private buildWebinarArray(result: any, isDebugMode?: boolean) {
        
        /**
         * Debug
         */
        if(isDebugMode) return result;

        if (result) {

            let TempResult = [];

            result.map(item => {

                let TempItemIndex = TempResult.findIndex(element=>element.id == item.webinarId);

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

                } else {
                    
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

        } else return [];

    }

    async getWebinarDetailById(id: Number) {
        
        const buildWhereQuery = (id: Number) => {
            let SQLWhereQuery = '';
            if (id!= null) 
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `w.id = '${id}'`;
            return SQLWhereQuery;
        }

        const buildWhereNotQuery = (id?: Number, category?: any) => {
            let SQLWhereQuery = '';
            if (id != null) 
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : '') + `w.id != '${id}'`;
            if (category != null)
                SQLWhereQuery += (SQLWhereQuery == '' ? ' WHERE ' : ' AND ') + `c.id = '${category}'`;
            return SQLWhereQuery;
        }

        const buildLimiQuery = (limit: Number, offset?: Number) => {
            let SQLLimiQuery = '';
            if (limit!= null) 
                SQLLimiQuery += `limit ${ Number(limit) * 3 } ${ (offset ? ` OFFSET ${ Number(offset) * 3 }` : '') } `;
            return SQLLimiQuery;
        }

        /**
         * SQL Debug
         */
        // return this.buildWebinarArray( 
        //     await this.getWebinars( 
        //         buildWhereQuery(
        //             id
        //         ) 
        //     ) 
        // );
        
        let resultOne = this.buildWebinarArray( 
            await this.getWebinars( 
                buildWhereQuery(
                    id
                ) 
            ) 
        );

        if (resultOne.length == 0) throw new InvalidWebinarIdException();

        /**
         * SQL Debug
         */
        // return await this.getWebinars( 
        //     buildWhereNotQuery(
        //         id, 
        //         resultOne[0]?.product.categoryId 
        //     ),
        //     buildLimiQuery(
        //         5
        //     ),
        //     true
        // );

        let resultRelated = this.buildWebinarArray( 
            await this.getWebinars( 
                buildWhereNotQuery(
                    id, 
                    resultOne[0]?.product.categoryId 
                ),
                buildLimiQuery(
                    5
                ) 
            ) 
        );

        resultOne[0].relatedWebinars = resultRelated;
        let result = resultOne[0];

        /**
         * Result with RelatedWebinars Debug
         */
        // return result;
        
        delete resultOne[0]; // remove array
        
        const VotedThemeIndex = result.themes.findIndex(item => item.voted == true && (item.type == 'High Odds' || item.type == 'Mixed Odds'));
        
        let TempSeatsData = [];

        if (VotedThemeIndex > -1) {

            let Seatsdata = await this.getSeatsData(VotedThemeIndex);

            for (let i = 0; i < result.themes[VotedThemeIndex].seatsCount; i++) {
        
                if (Seatsdata.find(element => element.number == i)) 
                    TempSeatsData.push(Seatsdata.find(element => element.number == i));
                else TempSeatsData.push({
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

    private async getSeatsData(id: Number, isDebugMode?: boolean ): Promise<any> {
        
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

        /**
         * SQL Debug
         */
        if (isDebugMode) return SQLquery;

        return await this.dataSource.query(SQLquery);

    }

    async getAll(): Promise<tbl_webinars[]> {
        return this.connection.query('SELECT * FROM `tbl_webinars`;');
    }

    async testInsertWebinarTheme(votedThemeIds?: any): Promise<void> {

        let testInsertData = [];
        let type = ["High Odds", "Mixed Odds", "Low Odds"];
        let highThemeSeats = [30, 20, 25, 15, 10];
        let lowThemeSeats = [80, 90, 100, 120, 150];
        let mixThemeSeats = [30, 35, 40, 45, 50];

        for (let i = 0; i < 1000; i++) {
        
            let votedThemeType = null;
        
            if (votedThemeIds[i]) 
                votedThemeType = type[(votedThemeIds[i] - 1) % 3] ;

            let tempThemeSeatIndex = Math.floor(Math.random()*5);

            testInsertData.push({
                type: type[0],
                webinarId: i + 1,
                isVoted: type[0] == votedThemeType,
                totalSeatsCount: highThemeSeats[tempThemeSeatIndex],
                remainingSeatsCount: highThemeSeats[tempThemeSeatIndex],
                price: 4000 / highThemeSeats[tempThemeSeatIndex],
                description: "This is a test Description for testing - " + i,
            });
        
            tempThemeSeatIndex = Math.floor(Math.random()*3);
        
            testInsertData.push({
                type: type[1],
                webinarId: i + 1,
                isVoted: type[1] == votedThemeType,
                totalSeatsCount: lowThemeSeats[tempThemeSeatIndex],
                remainingSeatsCount: lowThemeSeats[tempThemeSeatIndex],
                price: 3500 / lowThemeSeats[tempThemeSeatIndex],
                description: "This is a test Description for testing - " + i,
            });
        
            tempThemeSeatIndex = Math.floor(Math.random()*5);
        
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
        
        await this.dataSource.createQueryBuilder().insert().into(tbl_webinar_themes).values(testInsertData).execute();
    }

    async testInsertWebinar(): Promise<void> {
        
        let votedThemeIds = [];
        let type = ["High Odds","Mixed Odds", "Low Odds"];
        let testInsertData = [];
        let status = ["upcoming", "live"]
        
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

        await this.dataSource.createQueryBuilder().insert().into(tbl_webinars).values(testInsertData).execute();
        await this.testInsertWebinarTheme(votedThemeIds);
    }

} 