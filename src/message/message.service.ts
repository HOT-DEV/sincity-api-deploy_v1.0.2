import { Injectable } from '@nestjs/common';
import { Repository, Connection, DataSource } from 'typeorm';
import { tbl_message } from './message.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(tbl_message)
        private productRepository: Repository<tbl_message>,
        @InjectConnection()
        private readonly connection: Connection,
        private readonly dataSource: DataSource
    ) {}

    async getAll(): Promise<tbl_message[]> {
        return this.connection.query('SELECT * FROM `tbl_message`;');
    }
}