export default {
    input: './dist/esm3/public_api.js',
    output: [
        {
            file: './dist/fesm3/sheetbase-api-key.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: './dist/bundles/sheetbase-api-key.umd.js',
            format: 'umd',
            sourcemap: true,
            name: 'ApiKey'
        }
    ]
};