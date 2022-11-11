import { NotFoundException } from '@nestjs/common';
export declare class WebinarServiceException extends NotFoundException {
    constructor(message: string);
}
