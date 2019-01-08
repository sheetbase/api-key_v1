export default {
    input: './dist/esm3/public_api.js',
    output: [
        {
            file: './dist/fesm3/sheetbase-api-key-server.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: './dist/bundles/sheetbase-api-key-server.umd.js',
            format: 'umd',
            sourcemap: true,
            name: 'ApiKey'
        }
    ]
};