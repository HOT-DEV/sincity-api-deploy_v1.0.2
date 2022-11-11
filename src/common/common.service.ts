import { Injectable } from '@nestjs/common';
import { Repository, Connection, DataSource } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class CommonService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
        private readonly dataSource: DataSource
    ) {}

    async getAll(): Promise<any> {
        return this.dataSource.query('SELECT * FROM `tbl_users`;');
    }
}