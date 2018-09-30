import { IAuthApiKeyModule } from './types/module';
import { ISheetbaseModule } from '@sheetbase/core-server';
declare const Sheetbase: ISheetbaseModule;

declare const authApiKeyModuleExports: {(): IAuthApiKeyModule};
const authApiKey = authApiKeyModuleExports();
const AuthApiKey = authApiKey;

export { authApiKey, AuthApiKey };

export function sheetbase_authApiKey_example1(): void {
    // set the config
    const apiKey = 'my_api_key';
    Sheetbase.Config.set({ apiKey });
    // verify
    const aye: boolean = AuthApiKey.verify(apiKey);
    const nay: boolean = AuthApiKey.verify('not_my_api_key');
    Logger.log('The ayes have it: ' + aye);
    Logger.log('The nays have it: ' + nay);
}

/*

export function sheetbase_authApiKey_example2(): void {
    // using with Sheetbase Router
    Sheetbase.Router.get('/auth', AuthApiKey.middleware, (req, res) => {
        res.send('I have it!');
    });
}

*/