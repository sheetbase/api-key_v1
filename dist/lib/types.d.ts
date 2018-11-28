import { RouteRequest, RouteResponse } from '@sheetbase/core-server';
export interface Options {
    key?: string;
    apiKeys?: {
        [key: string]: string | APIKey;
    };
    failure?(req: RouteRequest, res: RouteResponse): any;
    trigger?(req: RouteRequest, apiKey: APIKey): void;
}
export interface APIKey {
    value?: string;
    id?: string;
    title?: string;
    description?: string;
    createdAt?: number;
    [k: string]: any;
}
