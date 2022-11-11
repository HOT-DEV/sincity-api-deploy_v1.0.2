import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { WebinarModule } from './webinar/webinar.module';
import { MessageModule } from './message/message.module';
import { CommonModule } from './common/common.module';

import { tbl_products } from './product/product.entity';
import { tbl_users } from './users/users.entity';
import { tbl_webinars } from './webinar/webinar.entity';
import { tbl_webinar_themes } from './webinar/webinar-theme.entity';
import { tbl_seat_booking } from './webinar/seat-booking.entity';
import { tbl_webinar_voting } from './webinar/webinar-voting.entity';
import { tbl_category } from './category/category.entity';
import { tbl_message } from './message/message.entity';
import { tbl_token } from './users/users.entity';

import { databaseConfig, assetsConfig } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', assetsConfig.storagePath),
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [
        tbl_products,
        tbl_users,
        tbl_webinars,
        tbl_webinar_themes,
        tbl_seat_booking,
        tbl_webinar_voting,
        tbl_category,
        tbl_message,
        tbl_token
      ],
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
    WebinarModule,
    MessageModule,
    AuthModule,
    CommonModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}