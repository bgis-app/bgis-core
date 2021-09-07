// babel.config.js - needed for jest
module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {targets: {node: 'current'}}
                ],
                '@babel/preset-typescript',
            ]
        }
    }
};
