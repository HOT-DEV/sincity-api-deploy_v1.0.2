import { WebinarService } from './webinar.service';
import { Request } from 'express';
export declare class WebinarController {
    private readonly webinarService;
    constructor(webinarService: WebinarService);
    getWebinar(request: Request): Promise<any>;
    getWebinars(request: Request): Promise<any>;
    getPopularWebinars(request: Request): Promise<any>;
}
