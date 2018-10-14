import { IRouteRequest, IRouteResponse, IRouteNext, IRouteHandler } from '@sheetbase/core-server';
import { IOptions } from './option';

export interface IModule {
    init(options: IOptions);
    verify(key: string): boolean;
    middleware(req: IRouteRequest, res: IRouteResponse, next: IRouteNext): IRouteHandler;
}
