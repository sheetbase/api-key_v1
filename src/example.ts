import * as Sheetbase from '@sheetbase/core-server';
import * as ApiKey from './public_api';

const key = 'my_api_key';

function load_() {
    return Sheetbase.sheetbase();
}

export function example1(): void {
    const Sheetbase = load_();

    Sheetbase.Router.get('/auth', ApiKey.middleware({ key }),
    (req, res) => {
        res.send('I have it!');
    });

    Logger.log('[Not executable] Per route middleware.');
}

export function example2(): void {
    const Sheetbase = load_();

    Sheetbase.Router.use(
        ApiKey.middleware({ key }),
    );

    Sheetbase.Router.get('/auth', (req, res) => {
        res.send('I have it!');
    });

    Sheetbase.Router.post('/auth', (req, res) => {
        res.send('I have it!');
    });

    Logger.log('[Not executable] Global use middleware.');
}