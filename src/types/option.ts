import { IRouteRequest, IRouteResponse } from '@sheetbase/core-server';

export interface IOptions {
    apiKey: string;
    failure?: {(req: IRouteRequest, res: IRouteResponse)};
}