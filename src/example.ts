import { IModule as ISheetbaseModule } from '@sheetbase/core-server';
import { IModule } from './types/module';

var proccess = proccess || this;

declare const Sheetbase: ISheetbaseModule;

declare const AuthApiKeyModule: {(): IModule};
const AuthApiKey: IModule = proccess['AuthApiKey'] || AuthApiKeyModule();

export function example1(): void {
    // add this line when use the library
    AuthApiKey.provide(Sheetbase);

    // for demonstration
    const apiKey = 'my_api_key';
    Sheetbase.Config.set({ apiKey });
    // verify
    const aye: boolean = AuthApiKey.verify(apiKey);
    const nay: boolean = AuthApiKey.verify('not_my_api_key');
    Logger.log('The ayes have it: ' + aye);
    Logger.log('The nays have it: ' + nay);
}

export function example2(): void {
    // add this line when use the library
    AuthApiKey.provide(Sheetbase);

    // using with Sheetbase Router
    Sheetbase.Router.get('/auth', AuthApiKey.middleware, (req, res) => {
        res.send('I have it!');
    });
    // or
    Sheetbase.Router.use(AuthApiKey.middleware);
}