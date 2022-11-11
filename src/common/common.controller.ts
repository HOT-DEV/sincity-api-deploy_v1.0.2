import { Controller, Get, Post, Param, All } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('api')
export class CommonController {
    constructor(private readonly CommonService: CommonService) {}

    /**
     * GetAll Product
     * @returns Product JSON Array
     */
    @All('/getAll')
    getAll(): Promise<any> {
        return this.CommonService.getAll();
    }

}