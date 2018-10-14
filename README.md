# Sheetbase Module: @sheetbase/auth-api-key-server

Sheetbase middleware to authorize with the API Key.

<!-- <block:header> -->

[![License][license_badge]][license_url] [![clasp][clasp_badge]][clasp_url] [![Support me on Patreon][patreon_badge]][patreon_url] [![PayPal][paypal_donate_badge]][paypal_donate_url] [![Ask me anything][ask_me_badge]][ask_me_url]

<!-- </block:header> -->

## Install

- Using npm: `npm install --save @sheetbase/auth-api-key-server`

- As a library: `1NulS_tPHLm401X7Km_ONKgtRK-VHnC5ODmNZ1sMt0QgXuDgtffxJ-Zzv`

  Set the _Indentifier_ to **AuthApiKey** and select the lastest version, [view code](https://script.google.com/d/1NulS_tPHLm401X7Km_ONKgtRK-VHnC5ODmNZ1sMt0QgXuDgtffxJ-Zzv/edit?usp=sharing).

## Examples

```ts
function example1(): void {
  // verify
  const aye: boolean = AuthApiKey.verify(apiKey);
  const nay: boolean = AuthApiKey.verify("not_my_api_key");
  Logger.log("The ayes have it: " + aye);
  Logger.log("The nays have it: " + nay);
}

function example2(): void {
  Logger.log("Not executable example.");
  /**
 * using with Sheetbase Router
 * 
    Sheetbase.Router.get('/auth', AuthApiKey.middleware, (req, res) => {
        res.send('I have it!');
    });
 *
*/
}
```

## Documentation

See the docs: https://sheetbase.github.io/module-auth-api-key-server

## API

An overview of the API, for detail please refer [the documentation](https://sheetbase.github.io/module-auth-api-key-server).

### AuthApiKey

```ts
export interface IModule {
  init(options: IOptions);
  verify(key: string): boolean;
  middleware(
    req: IRouteRequest,
    res: IRouteResponse,
    next: IRouteNext
  ): IRouteHandler;
}
```

## License

**@sheetbase/auth-api-key-server** is released under the [MIT](https://github.com/sheetbase/module-auth-api-key-server/blob/master/LICENSE) license.

<!-- <block:footer> -->

[license_badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[license_url]: https://github.com/sheetbase/module-auth-api-key-server/blob/master/LICENSE
[clasp_badge]: https://img.shields.io/badge/built%20with-clasp-4285f4.svg
[clasp_url]: https://github.com/google/clasp
[patreon_badge]: https://ionicabizau.github.io/badges/patreon.svg
[patreon_url]: https://www.patreon.com/lamnhan
[paypal_donate_badge]: https://ionicabizau.github.io/badges/paypal_donate.svg
[paypal_donate_url]: https://www.paypal.me/lamnhan
[ask_me_badge]: https://img.shields.io/badge/ask/me-anything-1abc9c.svg
[ask_me_url]: https://m.me/sheetbase

<!-- </block:footer> -->
