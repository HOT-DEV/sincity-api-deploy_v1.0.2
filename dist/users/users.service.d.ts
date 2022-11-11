import { Repository, Connection, DataSource } from 'typeorm';
import { tbl_users } from './users.entity';
import { tbl_token } from 'src/users/users.entity';
import { UserWithoutPassword } from './entities/user-without-password.entity';
export declare class UsersService {
    private usersRepository;
    private tokenRepository;
    private readonly connection;
    private readonly dataSource;
    constructor(usersRepository: Repository<tbl_users>, tokenRepository: Repository<tbl_token>, connection: Connection, dataSource: DataSource);
    getAll(): Promise<tbl_users[]>;
    findByEmail(email: string): Promise<tbl_users>;
    findById(id: string): Promise<tbl_users>;
    userTokensCreate(data: any): Promise<any>;
    testInsert(): Promise<void>;
    userCreate(data: any): Promise<any>;
    UserfindById(userId: Number): Promise<UserWithoutPassword>;
}
