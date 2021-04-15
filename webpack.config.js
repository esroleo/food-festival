/*
First, we need to create the main configuration 
object within our file. We'll write options within
this object that tell webpack what to do. 
As of webpack version 4, a config file is not necessary,
but we still want to use one so that we can be 
more specific with how webpack will function.
module.exports = {};
*/

/*
For a basic configuration, we need to provide 
webpack with three properties: entry, output,
and mode. The first thing we want to declare
is the entry property. The entry point is the 
root of the bundle and the beginning of the 
dependency graph, so give it the relative path 
to the client's code. Add the following code
inside the module.exports object you just created:

entry: './assets/js/script.js',
*/

/*
webpack will next take the entry point we have provided,
bundle that code, and output that bundled code to a
folder that we specify. It is common and best practice
to put your bundled code into a folder named dist, 
which is short for distribution. Add the following code:

  path: path.resolve(__dirname, 'dist'),
*/

/*
"The final piece of our basic setup will provide
the mode in which we want webpack to run. 
By default, webpack wants to run in production mode.
In this mode, webpack will minify our code for us 
automatically, along with some other nice additions.
We want our code to run in development mode,
so add the following code:

mode: 'development'
"
*/
const path = require("path");
const webpack = require("webpack");
//webpack-bundle-analyzer
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = 
{
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        // loader is implemented with use
        use: [
          {
            loader: 'file-loader',
            options: {
              name (file) {
                return "[path][name].[ext]"
              },
              publicPath: function(url) {
                return url.replace("../", "/assets/")
              }
            }  
          },
          { // image-webpack-loader to optimize has to go after
            // the images were emitted by the file-loder
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        //src: path.resolve("assets/img/icons/icon-512x512.png"),
        src: path.resolve("assets/img/icons/icon-512x512-min.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development',
};
