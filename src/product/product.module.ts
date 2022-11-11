import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { WebinarService } from 'src/webinar/webinar.service';
import { tbl_products } from './product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([tbl_products])],
    controllers: [ProductController],
    providers: [ProductService, WebinarService]
})
export class ProductModule {}