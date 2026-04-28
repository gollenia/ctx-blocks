const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const path = require('path');

module.exports = {
        ...defaultConfig,

        entry: () => ({
                ...getWebpackEntryPoints('script')(),
                admin: path.resolve(__dirname, 'packages/block-mods/index.ts'),
                frontend: path.resolve(__dirname, 'packages/scroll-animation/index.ts'),
        }),

        output: {
                ...defaultConfig.output,
                filename: '[name].js',
                path: path.resolve(__dirname, 'build'),
        },
};
