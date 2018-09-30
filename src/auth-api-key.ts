import { ISheetbaseModule, IHttpRequest, IResponse, IHttpNext, IHttpHandler } from '@sheetbase/core-server';
declare const Sheetbase: ISheetbaseModule;

export function authApiKeyModuleExports() {

    class AuthApiKey {

        constructor() { }

        verify(key: string): boolean {
            return (Sheetbase.Config.get('apiKey') === key);
        }

        middleware(req: IHttpRequest, res: IResponse, next: IHttpNext): IHttpHandler {
            var apiKey = req.body.apiKey || req.params.apiKey;
            if (Sheetbase.Config.get('apiKey') !== apiKey) {
                try {
                    return res.render('403');
                } catch (error) {
                    return res.html('<h1>403</h1><p>Unauthorized!</p>');
                }
            }
            return next();
        }
    }

    return new AuthApiKey();
}