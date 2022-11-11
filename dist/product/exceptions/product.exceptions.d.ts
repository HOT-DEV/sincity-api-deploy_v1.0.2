import { NotFoundException } from '@nestjs/common';
export declare class ProductServiceException extends NotFoundException {
    constructor(message: string);
}
