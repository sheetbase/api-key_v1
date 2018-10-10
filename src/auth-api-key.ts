import { IHttpRequest, IResponse, IHttpNext, IHttpHandler } from '@sheetbase/core-server';
import { IModule as ISheetbaseModule } from '@sheetbase/core-server';

export class AuthApiKey {
    private _Sheetbase: ISheetbaseModule;

    constructor() {
        var proccess = proccess || {};
        const Sheetbase: ISheetbaseModule = proccess['Sheetbase'];
        this._Sheetbase = Sheetbase;
    }
    
    provide(Sheetbase: ISheetbaseModule) {
        this._Sheetbase = Sheetbase;
        return this;
    }

    verify(key: string): boolean {
        return (this._Sheetbase.Config.get('apiKey') === key);
    }

    middleware(req: IHttpRequest, res: IResponse, next: IHttpNext): IHttpHandler {
        var apiKey = req.body['apiKey'] || req.params['apiKey'];
        if (this._Sheetbase.Config.get('apiKey') !== apiKey) {
            try {
                return res.render('errors/403');
            } catch (error) {
                return res.html(`
                    <h1>403!</h1>
                    <p>Unauthorized.</p>
                `);
            }
        }
        return next();
    }
}