const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* define constants */
// const demoFolder = 'examples';
const siteFolder = 'site';
const sitePath = path.resolve(__dirname, '../site');
const srcPath = path.resolve(__dirname, '../src');
const examplePath = path.resolve(__dirname, '../examples');
const destinationPath = path.resolve(__dirname, '../build/site');


module.exports = (env) => {

  console.log('The environment variables');
  console.log(env);

  let bgisVariants;
  let templatePages = [];

  /* Creates the npm files for development mode */
  bgisVariants = [
    {
      chunk: 'index',
      template: `./${siteFolder}/index.pug`,
      entry: `./${siteFolder}/no-js.ts`,
    },
    {
      chunk: 'api',
      template: `./${siteFolder}/api/index.pug`,
      entry: `./${siteFolder}/no-js.ts`,
    },
    {
      chunk: 'fonts',
      template: `./${siteFolder}/fonts/index.pug`,
      entry: `./${siteFolder}/no-js.ts`,
    },
    {
      chunk: 'examples',
      template: `./${siteFolder}/examples/index.pug`,
      entry: `./${siteFolder}/no-js.ts`,
    },
    {
      chunk: 'example-core-features',
      template: `./${siteFolder}/examples/data/core-features.pug`,
      entry: `./${siteFolder}/examples/data/core-features.ts`,
    },
    {
      chunk: 'example-core-features-double',
      template: `./${siteFolder}/examples/data/core-features-double.pug`,
      entry: `./${siteFolder}/examples/data/core-features-double.ts`,
    },
    {
      chunk: 'example-full-features',
      template: `./${siteFolder}/examples/data/full-features.pug`,
      entry: `./${siteFolder}/examples/data/full-features.ts`,
    },
    {
      chunk: 'example-buttons-event-handling',
      template: `./${siteFolder}/examples/data/buttons-event-handling.pug`,
      entry: `./${siteFolder}/examples/data/buttons-event-handling.ts`,
    },
    {
      chunk: 'example-geolocate',
      template: `./${siteFolder}/examples/data/geolocate.pug`,
      entry: `./${siteFolder}/examples/data/geolocate.ts`,
    },
    {
      chunk: 'example-export',
      template: `./${siteFolder}/examples/data/export.pug`,
      entry: `./${siteFolder}/examples/data/export.ts`,
    },
    {
      chunk: 'example-custom-buttons',
      template: `./${siteFolder}/examples/data/custom-buttons.pug`,
      entry: `./${siteFolder}/examples/data/custom-buttons.ts`,
    },
  ];
  bgisVariants.forEach(item => {
    templatePages.push(
      new HtmlWebpackPlugin({
        template: item.template, // relative path to the HTML files
        chunks: [item.chunk],
        templateParameters: {mode: item.mode},
        filename: `./${item.chunk}.html`, // output HTML files,
        minify: false
      }),
    );
  });


  let entries = {};
  bgisVariants.forEach(item => entries[item.chunk] = item.entry);
  console.log('The entries for the multientry project');
  console.log(entries);

  return {
    mode: 'production',
    entry: entries, // multiple entry points
    devtool: 'inline-source-map',
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: destinationPath,
      library: 'bgis-core',
      libraryTarget: 'umd',
      publicPath: './',
    },
    devServer: {
      contentBase: destinationPath,
      writeToDisk: true,
      historyApiFallback: {
        disableDotRule: true,
      },
      clientLogLevel: 'trace',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
            filters: {
              bgisDecode: (text) => {
                let lookup = {
                  '&': "&amp;",
                  '"': "&quot;",
                  '<': "&lt;",
                  '>': "&gt;"
                };
                return text.replace( /[&"<>]/g, (c) => lookup[c] );
                // return decodeURIComponent('XXXXX' + text + 'XXXXX');
              }
            }
          }
        },
        {
          test: /\.ts$/,
          include: [srcPath, examplePath, sitePath],
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
          include: [srcPath],
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
          include: [srcPath, sitePath],
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '[name].[ext]',
              outputPath: 'assets/'
            },
          }],
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // For Font Awesome
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',    // where the fonts will go
              // publicPath: './'       // override the default path
            },
          }],
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ].concat(templatePages),
  };
};


