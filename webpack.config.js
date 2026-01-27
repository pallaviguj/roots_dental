const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: './js/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].chunk.js',
      publicPath: '',
    },
    devtool: isProduction ? false : 'source-map',
    optimization: {
      minimize: isProduction,
      usedExports: true, // Tree shaking
      concatenateModules: true, // Module concatenation (scope hoisting)
      splitChunks: {
        chunks: 'async', // Only split async chunks
        minSize: 3000, // Minimum size for a chunk to be generated
        cacheGroups: {
          booking: {
            test: /[\\/]booking\.js$/,
            name: 'booking',
            chunks: 'async',
            priority: 10,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction, // Remove console logs in production
              drop_debugger: true,
              pure_funcs: isProduction ? ['console.log', 'console.debug'] : [],
            },
            mangle: {
              safari10: true, // Fix Safari 10+ issues
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer'],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          minifyJS: true,
          minifyCSS: true,
        } : false,
      }),
      new HtmlWebpackPlugin({
        template: './privacy-policy.html',
        filename: 'privacy-policy.html',
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          minifyJS: true,
          minifyCSS: true,
        } : false,
      }),
      new HtmlWebpackPlugin({
        template: './terms-of-service.html',
        filename: 'terms-of-service.html',
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          minifyJS: true,
          minifyCSS: true,
        } : false,
      }),
      new HtmlWebpackPlugin({
        template: './cookie-policy.html',
        filename: 'cookie-policy.html',
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          minifyJS: true,
          minifyCSS: true,
        } : false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          // Copy all CSS files
          {
            from: 'css/**/*.css',
            to: '[path][name][ext]',
          },
          // Copy all images
          {
            from: 'images/**/*',
            to: '[path][name][ext]',
          },
          // Copy SEO files
          {
            from: 'robots.txt',
            to: 'robots.txt',
          },
          {
            from: 'sitemap.xml',
            to: 'sitemap.xml',
          },
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true,
      watchFiles: ['**/*.html', '**/*.css', '**/*.js'],
    },
  };
};
