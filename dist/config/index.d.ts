import { JwtSignOptions } from '@nestjs/jwt';
export declare const accessJwtConfig: JwtSignOptions;
export declare const refreshJwtConfig: JwtSignOptions;
export declare const databaseConfig: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};
export declare const assetsConfig: {
    storagePath: string;
};
