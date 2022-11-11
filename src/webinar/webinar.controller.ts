import { Controller, Get, Post, All, Param, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { WebinarService } from './webinar.service';
import { Webinar } from '../interfaces';
import { Request } from 'express';


@Controller('webinar')
export class WebinarController {
    constructor(private readonly webinarService: WebinarService) {}

    // @Post('/testInsertWebinarTheme')
    // async testInsertWebinarTheme(): Promise<void> {
    //     return this.webinarService.testInsertWebinarTheme();
    // }
    //  

    @All('/getWebinarById')
    async getWebinar(@Req() request: Request): Promise<any> {
        return await this.webinarService.getWebinarDetailById((request.body.id ? request.body.id : null));
    }

    @All('/getWebinars')
    async getWebinars(@Req() request: Request): Promise<any> {
        return await this.webinarService.getWebinarsByQuery(request.body);  
    }

    @All('/getPopularWebinars')
    public async getPopularWebinars(@Req() request: Request): Promise<any> {
        if (!request.body.limit) request.body.limit = 5;
        return await this.webinarService.getWebinarsByQuery(request.body);
    }

}