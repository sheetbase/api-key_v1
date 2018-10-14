import { AuthApiKeyModule } from '../index';

const apiKey = 'my_api_key';
const AuthApiKey = AuthApiKeyModule({ apiKey });

export function example1(): void {
    // verify
    const aye: boolean = AuthApiKey.verify(apiKey);
    const nay: boolean = AuthApiKey.verify('not_my_api_key');
    Logger.log('The ayes have it: ' + aye);
    Logger.log('The nays have it: ' + nay);
}

export function example2(): void {
    Logger.log('Not executable example.');
    /**
     * using with Sheetbase Router
     * 
        Sheetbase.Router.get('/auth', AuthApiKey.middleware, (req, res) => {
            res.send('I have it!');
        });
     *
    */
}