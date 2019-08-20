/* tslint:disable:no-unused-expression */
import {
    RouteRequest,
    RouteResponse,
    RouteNext,
    OptionService,
    ResponseService,
} from '@sheetbase/server';

import { expect } from 'chai';
import { describe, it } from 'mocha';

import { middleware, APIKey } from '../src/public_api';

const key = 'xxx';
const apiKeys1 = {
    key1: 'Key 1',
};
const apiKeys2 = {
    key1: {
        title: 'Key 1',
        createdAt: 1234567890,
    },
    key2: {
        title: 'Key 2',
        createdAt: 1234567890,
    },
} as {[key: string]: APIKey};

/**
 * faked router objects
 */
let req: RouteRequest;
let res: RouteResponse;
let next: RouteNext;

function resetRouterObjects() {
    req = {
        query: {}, body: {},
    };

    res = new ResponseService(new OptionService());
    res.send = (content): any => content; // override #content
    res.html = (html): any => html; // override #html
    res.render = (file): any => file; // override #render

    next = (): any => true;
}

resetRouterObjects();

/**
 * test start
 */
describe('ApiKey module (single key)', () => {

    const Middleware = middleware({ key });

    afterEach(() => {
        resetRouterObjects();
    });

    it('should create a middleware instance', () => {
        expect(Middleware).to.be.not.null;
        expect(Middleware instanceof Function).to.equal(true);
    });

    it('should not pass (default html)', () => {
        res.render = () => { throw null; };

        const result = Middleware(req, res, next);
        expect(result).to.equal('<h1>403!</h1><p>Unauthorized.</p>');
    });

    it('should not pass (render errors/403.html)', () => {
        const result = Middleware(req, res, next);
        expect(result).to.equal('errors/403');
    });

    it('should not pass (wrong key)', () => {
        req.query.key = 'wrong-key';

        const result = Middleware(req, res, next);
        expect(result).to.equal('errors/403');
    });

    it('should pass (api key in query)', () => {
        req.query.key = key;

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });

    it('should pass (api key in body)', () => {
        req.body.key = key;

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });
});

describe('ApiKey module (multiple api keys #1)', () => {

    const Middleware = middleware({ apiKeys: apiKeys1 });

    afterEach(() => {
        resetRouterObjects();
    });

    it('should create a middleware instance', () => {
        expect(Middleware).to.be.not.null;
        expect(Middleware instanceof Function).to.equal(true);
    });

    it('should not pass (default html)', () => {
        res.render = () => { throw null; };

        const result = Middleware(req, res, next);
        expect(result).to.equal('<h1>403!</h1><p>Unauthorized.</p>');
    });

    it('should not pass (render errors/403.html)', () => {
        const result = Middleware(req, res, next);
        expect(result).to.equal('errors/403');
    });

    it('should not pass (wrong key)', () => {
        req.query.key = 'key0';

        const result = Middleware(req, res, next);
        expect(result).to.equal('errors/403');
    });

    it('should pass (api key in query)', () => {
        req.query.key = 'key1';

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });

    it('should pass (api key in body)', () => {
        req.body.key = 'key1';

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });
});

describe('ApiKey module (multiple api keys #2)', () => {

    const Middleware = middleware({ apiKeys: apiKeys2 });

    afterEach(() => {
        resetRouterObjects();
    });

    it('should create a middleware instance', () => {
        expect(Middleware).to.be.not.null;
        expect(Middleware instanceof Function).to.equal(true);
    });

    it('should not pass (default html)', () => {
        res.render = () => { throw null; };

        const result = Middleware(req, res, next);
        expect(result).to.equal('<h1>403!</h1><p>Unauthorized.</p>');
    });

    it('should not pass (render errors/403.html)', () => {
        const result = Middleware(req, res, next);
        expect(result).to.equal('errors/403');
    });

    it('should not pass (wrong key)', () => {
        req.query.key = 'key0';

        const result = Middleware(req, res, next);
        expect(result).to.equal('errors/403');
    });

    it('should pass (api key in query)', () => {
        req.query.key = 'key2';

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });

    it('should pass (api key in body)', () => {
        req.body.key = 'key2';

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });
});

describe('ApiKey module (other options)', () => {

    it('should use custom failure', () => {
        const Middleware = middleware({
            key,
            failure: (req, res) => {
                return res.send('a custom failure message');
            },
        });

        const result = Middleware(req, res, next);
        expect(result).to.equal('a custom failure message');
    });

    it('should use trigger', () => {
        const Middleware = middleware({
            key,
            trigger: () => {
                // do something here
            },
        });
        req.query.key = key;

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });

    it('should test api key variations (single key)', () => {
        const Middleware = middleware({
            key,
            trigger: (req, apiKey) => {
                if (apiKey.value !== 'xxx' || apiKey.title !== 'Untitled') {
                    throw null;
                }
            },
        });
        req.query.key = key;

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });

    it('should test api key variations (multiple #1)', () => {
        const Middleware = middleware({
            apiKeys: apiKeys1,
            trigger: (req, apiKey) => {
                if (apiKey.value !== 'key1' || apiKey.title !== 'Key 1') {
                    throw null;
                }
            },
        });
        req.query.key = 'key1';

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });

    it('should test api key variations (multiple #2)', () => {
        const Middleware = middleware({
            apiKeys: apiKeys2,
            trigger: (req, apiKey) => {
                if (
                    apiKey.value !== 'key2' ||
                    apiKey.title !== 'Key 2' ||
                    apiKey.createdAt !== 1234567890
                ) {
                    throw null;
                }
            },
        });
        req.query.key = 'key2';

        const result = Middleware(req, res, next);
        expect(result).to.equal(true);
    });

});