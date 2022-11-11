import { Injectable } from '@nestjs/common';
import { Repository, Connection, DataSource } from 'typeorm';
import { tbl_category } from 'src/category/category.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';


@Injectable()
export class CategoryService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
        private readonly dataSource: DataSource
    ) {}

    async getCategoryAll(): Promise<any> {
        return await this.dataSource
                        .query(`SELECT id, title FROM tbl_category ORDER BY title`);
    }

}