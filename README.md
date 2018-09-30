# Sheetbase Module: auth-api-key-server

Authorize Sheetbase backend with the API Key.

## Install

- NPM: ``$ npm install --save @sheetbase/auth-api-key-server``

- As library: ``1NulS_tPHLm401X7Km_ONKgtRK-VHnC5ODmNZ1sMt0QgXuDgtffxJ-Zzv`` (set Indentifier to **AuthApiKey**, [view code](https://script.google.com/d/1NulS_tPHLm401X7Km_ONKgtRK-VHnC5ODmNZ1sMt0QgXuDgtffxJ-Zzv/edit?usp=sharing))

## Usage

```ts
// verify
const apiKey = 'my_api_key';
Sheetbase.Config.set({ apiKey });
const aye: boolean = AuthApiKey.verify(apiKey);
const nay: boolean = AuthApiKey.verify('not_my_api_key');
Logger.log('The ayes have it: ' + aye);
Logger.log('The nays have it: ' + nay);

// using with Sheetbase Router
Sheetbase.Router.get('/auth', AuthApiKey.middleware, (req, res) => {
	res.send('I have it!');
});
```

## License

[MIT][license-url]

[license-url]: https://github.com/sheetbase/module-auth-api-key-server/blob/master/LICENSE