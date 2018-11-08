export default {
    input: './dist/public_api.js',
    output: {
        file: './dist/bundles/sheetbase-auth-api-key-server.umd.js',
        format: 'umd',
        name: 'AuthApiKey',
        sourcemap: true
    },
};