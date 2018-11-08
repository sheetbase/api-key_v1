/* tslint:disable:no-unused-expression */
import { RouteRequest, RouteResponse, RouteNext, Response } from '@sheetbase/core-server';

import { expect } from 'chai';
import { describe, it } from 'mocha';

import { middleware } from '../src/public_api';

const apiKey = 'xxx';

const req: RouteRequest = {
    query: {}, body: {},
};

const res: RouteResponse = Response;
res.html = (content): any => content; // override #html

const next: RouteNext = () => null;

describe('AuthApiKey module', () => {
    const Middleware = middleware({ apiKey });

    it('should create a middleware instance', () => {
        expect(Middleware).to.be.not.null;
    });

    it('should not pass (default html)', () => {
        const result = Middleware(req, res, next);
        expect(result).to.equal('<h1>403!</h1><p>Unauthorized.</p>');
    });

    it('should not pass (render errors/403.html)', () => {
        res.render = (file): any => file; // override #render

        const result = Middleware(req, res, next);
        expect(result).to.equal('errors/403');
    });

    it('should not pass (custom failure)', () => {
        const Middleware = middleware({
            apiKey,
            failure: (req, res) => {
                return res.html('a custom failure function');
            },
        });

        const result = Middleware(req, res, next);
        expect(result).to.equal('a custom failure function');
    });

    it('should pass (api key in query)', () => {
        req.query.apiKey = apiKey;

        const result = Middleware(req, res, next);
        expect(result).to.be.null;
    });

    it('should pass (api key in body)', () => {
        req.body.apiKey = apiKey;

        const result = Middleware(req, res, next);
        expect(result).to.be.null;
    });
});