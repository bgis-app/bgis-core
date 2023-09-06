const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/* define constants */
const dirSource = path.resolve(__dirname, '../src');

module.exports = (env) => {

  console.log("The environment variables", env);

  let templatePages = [];

    /* Creates the b-gis npm files for production mode */
   const bgisVariants = [
      { chunk: 'bgis', template: './templates/bgis/full-page.pug', entry: './src/index.ts', mode: 'core' },
      { chunk: 'bgis_core', template: './templates/bgis/full-page.pug', entry: './src/indexCore.ts', mode: 'core' },
      { chunk: 'bgis_client', template: './templates/bgis/full-page.pug', entry: './src/indexClient.ts', mode: 'core' }
    ];
   const dirDestination = path.resolve(__dirname, '../build/bgis');


  let entries = {};
  bgisVariants.forEach(item => entries[item.chunk] = item.entry);
  console.log("The entries for the multi entry project");
  console.log(entries);

  return {
    mode: 'production',
    externals: /^ol\/.+$/i,
    entry: entries, // multiple entry points
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: dirDestination,
      library: 'bgis-core',
      libraryTarget: 'umd',
      publicPath: ''
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: [dirSource],
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.prod.json'
              }
            },
          ],
        },
        {
          test: /\.css$|\.scss$/,
          include: [dirSource],
          use: [{
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              modules: 'icss'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }],
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          type: 'asset/resource',
          generator: {
            filename: './assets/fonts/[contenthash][ext]',
          },
        },
        { test: /\.pug$/, loader: 'pug-loader' },
      ],
    },
    optimization: {
      runtimeChunk: false,
      minimize: true,
      minimizer: [
        `...`,
        new CssMinimizerWebpackPlugin()
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject: false,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        // Webpack statistics in target folder
        reportFilename: '../prod-build-stats.html'
      }),
    ].concat(templatePages),
  };
}


