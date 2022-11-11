import { NotFoundException } from '@nestjs/common';
export declare class AuthServiceInputException extends NotFoundException {
    constructor(message: string);
}
