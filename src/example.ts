import * as Sheetbase from '@sheetbase/core-server';
import * as AuthApiKey from './public_api';

const apiKey = 'my_api_key';

export function example1(): void {
    Sheetbase.Router.get('/auth', AuthApiKey.middleware({ apiKey }),
    (req, res) => {
        res.send('I have it!');
    });

    Logger.log('[Not executable] Per route middleware.');
}

export function example2(): void {
    Sheetbase.Router.use(
        AuthApiKey.middleware({ apiKey }),
    );

    Sheetbase.Router.get('/auth', (req, res) => {
        res.send('I have it!');
    });

    Sheetbase.Router.post('/auth', (req, res) => {
        res.send('I have it!');
    });

    Logger.log('[Not executable] Global use middleware.');
}