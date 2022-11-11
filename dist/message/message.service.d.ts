import { Repository, Connection, DataSource } from 'typeorm';
import { tbl_message } from './message.entity';
export declare class MessageService {
    private productRepository;
    private readonly connection;
    private readonly dataSource;
    constructor(productRepository: Repository<tbl_message>, connection: Connection, dataSource: DataSource);
    getAll(): Promise<tbl_message[]>;
}
