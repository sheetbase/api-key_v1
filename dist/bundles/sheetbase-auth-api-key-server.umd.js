(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.AuthApiKey = {})));
}(this, (function (exports) { 'use strict';

    function middleware(options) {
        return function (req, res, next) {
            var apiKey = req.body.apiKey || req.query.apiKey;
            if (!options.apiKey || options.apiKey !== apiKey) {
                var failure = options.failure;
                if (!!(failure && failure.constructor && failure.call && failure.apply)) {
                    return failure(req, res);
                }
                else {
                    try {
                        return res.render('errors/403');
                    }
                    catch (error) {
                        return res.html('<h1>403!</h1><p>Unauthorized.</p>');
                    }
                }
            }
            return next();
        };
    }

    exports.middleware = middleware;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sheetbase-auth-api-key-server.umd.js.map
