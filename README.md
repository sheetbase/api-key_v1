# Sheetbase Module: @sheetbase/auth-api-key-server

Sheetbase middleware to authorize with the API Key.

<!-- <block:header> -->

[![Build Status](https://travis-ci.com/sheetbase/auth-api-key-server.svg?branch=master)](https://travis-ci.com/sheetbase/auth-api-key-server) [![Coverage Status](https://coveralls.io/repos/github/sheetbase/auth-api-key-server/badge.svg?branch=master)](https://coveralls.io/github/sheetbase/auth-api-key-server?branch=master) [![NPM](https://img.shields.io/npm/v/@sheetbase/auth-api-key-server.svg)](https://www.npmjs.com/package/@sheetbase/auth-api-key-server) [![License][license_badge]][license_url] [![clasp][clasp_badge]][clasp_url] [![Support me on Patreon][patreon_badge]][patreon_url] [![PayPal][paypal_donate_badge]][paypal_donate_url] [![Ask me anything][ask_me_badge]][ask_me_url]

<!-- </block:header> -->

## Install

Using npm: `npm install --save @sheetbase/auth-api-key-server`

```ts
import * as AuthApiKey from "@sheetbase/auth-api-key-server";
```

As a library: `1NulS_tPHLm401X7Km_ONKgtRK-VHnC5ODmNZ1sMt0QgXuDgtffxJ-Zzv`

Set the _Indentifier_ to **AuthApiKeyModule** and select the lastest version, [view code](https://script.google.com/d/1NulS_tPHLm401X7Km_ONKgtRK-VHnC5ODmNZ1sMt0QgXuDgtffxJ-Zzv/edit?usp=sharing).

```ts
declare const AuthApiKeyModule: { AuthApiKey: any };
const AuthApiKey = AuthApiKeyModule.AuthApiKey;
```

## Usage

- Docs homepage: https://sheetbase.github.io/auth-api-key-server

- API reference: https://sheetbase.github.io/auth-api-key-server/api

### Examples

```ts
import * as Sheetbase from "@sheetbase/core-server";
import * as AuthApiKey from "./public_api";

const key = "my_api_key";

function load_() {
  return Sheetbase.sheetbase();
}

export function example1(): void {
  const Sheetbase = load_();

  Sheetbase.Router.get("/auth", AuthApiKey.middleware({ key }), (req, res) => {
    res.send("I have it!");
  });

  Logger.log("[Not executable] Per route middleware.");
}

export function example2(): void {
  const Sheetbase = load_();

  Sheetbase.Router.use(AuthApiKey.middleware({ key }));

  Sheetbase.Router.get("/auth", (req, res) => {
    res.send("I have it!");
  });

  Sheetbase.Router.post("/auth", (req, res) => {
    res.send("I have it!");
  });

  Logger.log("[Not executable] Global use middleware.");
}
```

## License

**@sheetbase/auth-api-key-server** is released under the [MIT](https://github.com/sheetbase/auth-api-key-server/blob/master/LICENSE) license.

<!-- <block:footer> -->

[license_badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[license_url]: https://github.com/sheetbase/auth-api-key-server/blob/master/LICENSE
[clasp_badge]: https://img.shields.io/badge/built%20with-clasp-4285f4.svg
[clasp_url]: https://github.com/google/clasp
[patreon_badge]: https://lamnhan.github.io/assets/images/badges/patreon.svg
[patreon_url]: https://www.patreon.com/lamnhan
[paypal_donate_badge]: https://lamnhan.github.io/assets/images/badges/paypal_donate.svg
[paypal_donate_url]: https://www.paypal.me/lamnhan
[ask_me_badge]: https://img.shields.io/badge/ask/me-anything-1abc9c.svg
[ask_me_url]: https://m.me/sheetbase

<!-- </block:footer> -->
