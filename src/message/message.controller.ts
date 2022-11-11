import { Controller, Get, Post, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { tbl_message } from './message.entity';

@Controller('message')
export class MessageController {
    constructor(private readonly MessageService: MessageService) {}

    /**
     * GetAll Product
     * @returns Product JSON Array
     */
    @Post('/getAll')
    getAll(): Promise<tbl_message[]> {
        return this.MessageService.getAll();
    }

}