import { MessageService } from './message.service';
import { tbl_message } from './message.entity';
export declare class MessageController {
    private readonly MessageService;
    constructor(MessageService: MessageService);
    getAll(): Promise<tbl_message[]>;
}
