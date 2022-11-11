import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { tbl_message } from './message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([tbl_message])],
    controllers: [MessageController],
    providers: [MessageService]
})
export class MessageModule {}