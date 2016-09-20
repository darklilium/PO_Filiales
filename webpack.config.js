var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        //put ur bundle files here.
        login: './static/js/bundles/login.js',
        pocasablanca: './static/js/bundles/pocasablanca.js',
        polinares: './static/js/bundles/polinares.js',
        politoral: './static/js/bundles/politoral.js',
        poparral: './static/js/bundles/poparral.js',
        pochilquinta: './static/js/bundles/pochilquinta.js',
        vendor: [
        // put your third party libs here
        ]
    },
    output: {
        path: path.join(path.join(__dirname, 'dist'), 'js'),
        filename: '[name].js',
        libraryTarget: "amd"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    module: {
      loaders: [
       {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         loader: 'babel',
         query: {
           presets: ['react', 'es2015', 'stage-2']
         }
       }
     ]
   },
    externals: [
        function(context, request, callback) {
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request)
            ) {
                return callback(null, "amd " + request);
            }
            callback();
        }
    ],
    devServer: {
      inline: true,
      port: 443,
      host: "127.0.0.1"
    },
    devtool: 'source-map'
};
