const path = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
  console.log("The entries for the multientry project");
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
      publicPath: '/'
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
          }, {
            loader: 'sass-loader',
          }, {
            loader: 'postcss-loader',
          }],
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          include: [dirSource],
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'TODO/[hash]-[name].[ext]'
            }
          }]
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // For Font Awesome
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',    // where the fonts will go
              publicPath: './fonts/'       // override the default path
            }
          }]
        },
        { test: /\.pug$/, loader: 'pug-loader' },
      ],
    },
    optimization: {
      runtimeChunk: false,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            ie8: false,
            toplevel: true,
            module: true,
            compress: {
              dead_code: true,
              warnings: false,
              properties: true,
              drop_debugger: true,
              conditionals: true,
              booleans: true,
              loops: true,
              unused: true,
              toplevel: true,
              if_return: true,
              inline: true,
              join_vars: true,
              ecma: 6,
              module: true
            },
            output: {
              comments: false,
              beautify: false,
              indent_level: 2,
              ecma: 6
            },
            mangle: {
              module: true,
              toplevel: true
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject: true,
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


