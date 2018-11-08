import { RouteRequest, RouteResponse } from '@sheetbase/core-server';

export interface Options {
    apiKey: string;
    failure?: {(req: RouteRequest, res: RouteResponse)};
}