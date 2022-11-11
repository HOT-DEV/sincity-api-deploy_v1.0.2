import { CommonService } from './common.service';
export declare class CommonController {
    private readonly CommonService;
    constructor(CommonService: CommonService);
    getAll(): Promise<any>;
}
