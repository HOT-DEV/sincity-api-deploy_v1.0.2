import { JwtSignOptions } from '@nestjs/jwt';

/** Configurations for the access jsonwebtoken used for authentication */
export const accessJwtConfig: JwtSignOptions = {
  secret: 'sincityAccessJwtKey',
  expiresIn: '15m',
};

/** Configurations for the refresh jsonwebtoken used for authentication */
export const refreshJwtConfig: JwtSignOptions = {
  secret: 'sincityRefreshJwtKey',
  expiresIn: '90d',
};


/**
 * 

Host name = 142.4.26.156
Database name = sinciua8_sincity
Database username = sinciua8_db
Database password = sincity_database
MySQL Connection Port = 3306

TCP or UDP, either is fine.
 */

export const databaseConfig = {
    host: '142.4.26.156',
    port: 3306,
    username: 'sinciua8_db',
    password: 'sincity_database',
    database: 'sinciua8_sincity'
}

export const assetsConfig = {
    storagePath: './assets'
}