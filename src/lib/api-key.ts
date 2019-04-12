import { RouteRequest, RouteResponse, RouteNext, RouteHandler } from '@sheetbase/server';

import { Options, APIKey } from './types';

function loadAPIKeys(options: Options): {[key: string]: APIKey} {
    const apiKeys = {};
    const { apiKeys: validApiKeys, key: validKey } = options;
    if (validKey) {
        apiKeys[validKey] = { title: 'Untitled', value: validKey };
    } else if (!!validApiKeys) {
        for (const k of Object.keys(validApiKeys)) {
            const apiKey = validApiKeys[k];
            if (apiKey instanceof Object) { // apiKey = an object
                apiKeys[k] = { ... apiKey as APIKey, value: k };
            } else { // apiKey = string
                apiKeys[k] = { title: apiKey, value: k };
            }
        }
    }
    return apiKeys;
}

export function middleware(options: Options = {}): RouteHandler {
    return (req: RouteRequest, res: RouteResponse, next: RouteNext) => {
        // 'apiKeys/apiKey' = objects/object (APIKey interface)
        // 'key' = string
        // get key from the request
        const key = req.body.apiKey || req.query.apiKey;
        const apiKeys = loadAPIKeys(options);
        const apiKey = key ? apiKeys[key] : null;

        if (!apiKey) {
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
        } else {
            const trigger = options.trigger;
            if (!!(trigger && trigger.constructor && trigger.call && trigger.apply)) {
                trigger(req, apiKey);
            }
        }
        return next();
    };
}
