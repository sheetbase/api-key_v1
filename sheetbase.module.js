var exports = exports || {};
var module = module || { exports: exports };
/**
 * Sheetbase module
 * Name: @sheetbase/auth-api-key-server
 * Export name: AuthApiKey
 * Description: Sheetbase middleware to authorize with the API Key.
 * Version: 0.0.3
 * Author: Sheetbase
 * Homepage: https://sheetbase.net
 * License: MIT
 * Repo: https://github.com/sheetbase/module-auth-api-key-server.git
 */

function AuthApiKeyModule() {
    // import { IHttpRequest, IResponse, IHttpNext, IHttpHandler } from '@sheetbase/core-server';
    // import { IModule as ISheetbaseModule } from '@sheetbase/core-server';
    var AuthApiKey = /** @class */ (function () {
        function AuthApiKey() {
            var proccess = proccess || {};
            var Sheetbase = proccess['Sheetbase'];
            this._Sheetbase = Sheetbase;
        }
        AuthApiKey.prototype.provide = function (Sheetbase) {
            this._Sheetbase = Sheetbase;
            return this;
        };
        AuthApiKey.prototype.verify = function (key) {
            return (this._Sheetbase.Config.get('apiKey') === key);
        };
        AuthApiKey.prototype.middleware = function (req, res, next) {
            var apiKey = req.body['apiKey'] || req.params['apiKey'];
            if (this._Sheetbase.Config.get('apiKey') !== apiKey) {
                try {
                    return res.render('errors/403');
                }
                catch (error) {
                    return res.html("\n                    <h1>403!</h1>\n                    <p>Unauthorized.</p>\n                ");
                }
            }
            return next();
        };
        return AuthApiKey;
    }());
    // import { IModule } from './types/module';
    // import { AuthApiKey } from './auth-api-key';
    var moduleExports = new AuthApiKey();
    return moduleExports || {};
}
exports.AuthApiKeyModule = AuthApiKeyModule;
// add to the global namespace
var proccess = proccess || this;
proccess['AuthApiKey'] = AuthApiKeyModule();
