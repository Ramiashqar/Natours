// webpack.config.js

module.exports = {
    output: {
      filename: 'App.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['env', { modules: false }],
            ],
          },
        },
      ],
    },
  };