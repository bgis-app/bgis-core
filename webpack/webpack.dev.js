const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* define constants */
const devFolder = 'dev';
const dirSource = path.resolve(__dirname, '../src');
const devSource = path.resolve(__dirname, '../' + devFolder);
const dirDestination = path.resolve(__dirname, '../build/dev');


module.exports = (env) => {

  console.log('The environment variables');
  console.log(env);

  let bgisVariants;
  let templatePages = [];

  /* Creates the npm files for development mode */
  bgisVariants = [
    {
      chunk: 'index',
      template: './templates/bgis/index.pug',
      entry: `./${devFolder}/no-js.ts`,
    },
    {
      chunk: 'bgis_core',
      template: './templates/bgis/core-container.pug',
      entry: `./${devFolder}/core/indexCore.ts`,
    },
    {
      chunk: 'bgis_client',
      template: './templates/bgis/client-container.pug',
      entry: `./${devFolder}/client/indexClient.ts`,
    },
  ];
  bgisVariants.forEach(item => {
    templatePages.push(
      new HtmlWebpackPlugin({
        template: item.template, // relative path to the HTML files
        chunks: [item.chunk],
        templateParameters: {mode: item.mode},
        filename: `./${item.chunk}.html`, // output HTML files
      }),
    );
  });


  let entries = {};
  bgisVariants.forEach(item => entries[item.chunk] = item.entry);
  console.log('The entries for the multientry project');
  console.log(entries);

  return {
    mode: 'development',
    entry: entries, // multiple entry points
    devtool: 'inline-source-map',
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: dirDestination,
      library: 'bgis-core',
      libraryTarget: 'umd',
      publicPath: '/',
    },
    devServer: {
      contentBase: dirDestination,
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
          loader: 'pug-loader'
        },
        {
          test: /\.ts$/,
          include: [dirSource, devSource],
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
          include: [dirSource, devSource],
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
          include: [dirSource, devSource],
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'TODO/[hash]-[name].[ext]',
            },
          }],
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // For Font Awesome
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',    // where the fonts will go
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


