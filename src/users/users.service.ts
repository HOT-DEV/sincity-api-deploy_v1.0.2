import { Injectable } from '@nestjs/common';
import { Repository, Connection, DataSource, FindOperator } from 'typeorm';
import { tbl_users } from './users.entity';
import { tbl_token } from 'src/users/users.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { WhereClause } from 'typeorm/query-builder/WhereClause';
import { UserWithoutPassword } from './entities/user-without-password.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(tbl_users)
        private usersRepository: Repository<tbl_users>,
        @InjectRepository(tbl_token)
        private tokenRepository: Repository<tbl_token>,
        @InjectConnection()
        private readonly connection: Connection,        
        private readonly dataSource: DataSource
    ) {}

    async getAll(): Promise<tbl_users[]> {
        return await this.usersRepository.find();
    }
    
    async findByEmail(email: string ): Promise<tbl_users> {
        const lowerCaseEmail = email.toLowerCase();
        return await this.usersRepository.findOne({where: {email : lowerCaseEmail}});
    }

    async findById(id: string ): Promise<tbl_users> {
        return await this.usersRepository.findOneById(id);
    }

    async userTokensCreate(data: any): Promise<any> {
        return await this.dataSource.createQueryBuilder().insert().into(tbl_token).values(data).execute();
    }

    async testInsert(): Promise<void> {
        let testInsertData = [];
        for (let i = 0; i < 100; i++) {
            testInsertData.push({
              firstName: `FirsttName - ${i + 1}`,
              lastName: `LastName - ${i + 1}`,
              email: `test${i+1}@example.com`,
              password: `test-password-${i+1}`,
              address: `Test-Address-${i+1}`,
              city: `Texas-${i+1}`,
              avatar: '/img/avatar.png',
              statesCode: 'TX',
              countryCode: 'USA'
            });            
        }
        await this.dataSource.createQueryBuilder().insert().into(tbl_users).values(testInsertData).execute();
    }

    async userCreate(data: any): Promise<any> {
        return await this.usersRepository.create(data);
    }

    async UserfindById(userId: Number): Promise<UserWithoutPassword> {
        const user = await this.usersRepository.findOneById(Number(userId));
        delete user.password;
        return { ...user };
    }
} 