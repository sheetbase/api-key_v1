import { IHttpHandler } from '@sheetbase/core-server';

export interface IAuthApiKeyModule {
    verify: {(key: string): boolean};
    middleware: {(req, res, next): IHttpHandler};
}