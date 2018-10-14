var exports = exports || {};
var module = module || { exports: exports };
/**
 * Sheetbase module
 * Name: @sheetbase/auth-api-key-server
 * Export name: AuthApiKey
 * Description: Sheetbase middleware to authorize with the API Key.
 * Version: 0.0.4
 * Author: Sheetbase
 * Homepage: https://sheetbase.net
 * License: MIT
 * Repo: https://github.com/sheetbase/module-auth-api-key-server.git
 */

function AuthApiKeyModule(options) {
    // import { IRouteRequest, IRouteResponse, IRouteNext, IRouteHandler } from '@sheetbase/core-server';
    // import { IModule, IOptions } from '../index';
    var AuthApiKey = /** @class */ (function () {
        function AuthApiKey(options) {
            this._options = {
                apiKey: null
            };
            this.init(options);
        }
        AuthApiKey.prototype.init = function (options) {
            this._options = options;
            return this;
        };
        AuthApiKey.prototype.verify = function (key) {
            return (this._options.apiKey === key);
        };
        AuthApiKey.prototype.middleware = function (req, res, next) {
            var apiKey = req.body.apiKey || req.query.apiKey;
            if (!this.verify(apiKey)) {
                var failure = this._options.failure;
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
        return AuthApiKey;
    }());
    var moduleExports = new AuthApiKey(options);
    return moduleExports || {};
}
exports.AuthApiKeyModule = AuthApiKeyModule;
// add 'AuthApiKey' to the global namespace
(function (process) {
    process['AuthApiKey'] = AuthApiKeyModule();
})(this);
