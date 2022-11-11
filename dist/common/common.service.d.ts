import { Connection, DataSource } from 'typeorm';
export declare class CommonService {
    private readonly connection;
    private readonly dataSource;
    constructor(connection: Connection, dataSource: DataSource);
    getAll(): Promise<any>;
}
