import { IModule as ISheetbaseModule, IHttpRequest, IResponse, IHttpNext } from '@sheetbase/core-server';
import { IHttpHandler } from '@sheetbase/core-server';

export interface IModule {
    provide(Sheetbase: ISheetbaseModule): IModule;
    verify(key: string): boolean;
    middleware(req: IHttpRequest, res: IResponse, next: IHttpNext): IHttpHandler;
}
