import { Connection, DataSource } from 'typeorm';
import { tbl_webinars } from './webinar.entity';
export declare class WebinarService {
    private readonly connection;
    private readonly dataSource;
    constructor(connection: Connection, dataSource: DataSource);
    private getWebinars;
    getWebinarsByQuery(body?: any): Promise<any>;
    private buildWebinarArray;
    getWebinarDetailById(id: Number): Promise<any>;
    private getSeatsData;
    getAll(): Promise<tbl_webinars[]>;
    testInsertWebinarTheme(votedThemeIds?: any): Promise<void>;
    testInsertWebinar(): Promise<void>;
}
