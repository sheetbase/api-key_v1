(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.AuthApiKey = {})));
}(this, (function (exports) { 'use strict';

    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function loadAPIKeys(options) {
        var apiKeys = {};
        var validApiKeys = options.apiKeys, validKey = options.key;
        if (validKey) {
            apiKeys[validKey] = { title: 'Untitled', value: validKey };
        }
        else if (!!validApiKeys) {
            for (var _i = 0, _a = Object.keys(validApiKeys); _i < _a.length; _i++) {
                var k = _a[_i];
                var apiKey = validApiKeys[k];
                if (apiKey instanceof Object) { // apiKey = an object
                    apiKeys[k] = __assign({}, apiKey, { value: k });
                }
                else { // apiKey = string
                    apiKeys[k] = { title: apiKey, value: k };
                }
            }
        }
        return apiKeys;
    }
    function middleware(options) {
        if (options === void 0) { options = {}; }
        return function (req, res, next) {
            // 'apiKeys/apiKey' = objects/object (APIKey interface)
            // 'key' = string
            // get key from the request
            var key = req.body.apiKey || req.query.apiKey;
            var apiKeys = loadAPIKeys(options);
            var apiKey = key ? apiKeys[key] : null;
            if (!apiKey) {
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
            else {
                var trigger = options.trigger;
                if (!!(trigger && trigger.constructor && trigger.call && trigger.apply)) {
                    trigger(req, apiKey);
                }
            }
            return next();
        };
    }

    exports.middleware = middleware;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sheetbase-auth-api-key-server.umd.js.map
