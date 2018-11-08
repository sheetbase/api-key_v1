import { RouteRequest, RouteResponse, RouteNext, RouteHandler } from '@sheetbase/core-server';

import { Options } from './types';

export function middleware(options: Options): RouteHandler {
    return (req: RouteRequest, res: RouteResponse, next: RouteNext) => {
        const apiKey = req.body.apiKey || req.query.apiKey;
        if (!options.apiKey || options.apiKey !== apiKey) {
            const failure = options.failure;
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
    };
}
