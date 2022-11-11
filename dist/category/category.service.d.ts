import { Connection, DataSource } from 'typeorm';
export declare class CategoryService {
    private readonly connection;
    private readonly dataSource;
    constructor(connection: Connection, dataSource: DataSource);
    getCategoryAll(): Promise<any>;
}
