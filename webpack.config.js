module.exports = {
    resolve: { extensions: ['.js', '.ts'] },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    externals: [],
    entry: './src/index.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'ngx-translate-phraseapp.js',
        libraryTarget: "umd",
        library: 'ngx-translate-phraseapp'
    }
};