const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://food.crazyphper.com/api"'
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST
  },
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}