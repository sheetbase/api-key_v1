import { IRouteRequest, IRouteResponse, IRouteNext, IRouteHandler } from '@sheetbase/core-server';

import { IModule, IOptions } from '../index';

export class AuthApiKey {
    private _options: IOptions = {
        apiKey: null
    };

    constructor(options: IOptions) {
        this.init(options);
    }

    init(options: IOptions): IModule {
        this._options = options;
        return this;
    }

    verify(key: string): boolean {
        return (this._options.apiKey === key);
    }

    middleware(req: IRouteRequest, res: IRouteResponse, next: IRouteNext): IRouteHandler {
        var apiKey = req.body.apiKey || req.query.apiKey;
        if (!this.verify(apiKey)) {
            const failure = this._options.failure;
            if (!!(failure && failure.constructor && failure.call && failure.apply)) {
                return failure(req, res);
            } else {
                try {
                    return res.render('errors/403');
                } catch (error) {
                    return res.html('<h1>403!</h1><p>Unauthorized.</p>');
                }
            }
        }
        return next();
    }
}