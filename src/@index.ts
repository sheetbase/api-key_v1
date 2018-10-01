/**
 * 
 * Name: @sheetbase/auth-api-key-server
 * Description: Sheetbase middleware to authorization with API Key.
 * Version: 0.0.2
 * Author: Sheetbase
 * Homepage: https://sheetbase.net
 * License: MIT
 * Repo: https://github.com/sheetbase/module-auth-api-key-server.git
 *
 */
 
import { IAuthApiKeyModule } from './types/module';
import { ISheetbaseModule } from '@sheetbase/core-server';
declare const Sheetbase: ISheetbaseModule;

declare const authApiKeyModuleExports: {(): IAuthApiKeyModule};
const authApiKey = authApiKeyModuleExports();
const AuthApiKey = authApiKey;

for (const prop of Object.keys({... authApiKey, ... Object.getPrototypeOf(authApiKey)})) {
	this[prop] = authApiKey[prop];
}

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