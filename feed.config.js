/*
 * @Author: weijiali
 * @Date: 2022-03-17 14:24:48
 * @LastEditors: weijiali
 * @LastEditTime: 2022-09-29 11:33:58
 */

const path = require('path');

module.exports = {
  debug: true,
  output: {
    path: 'public',
    publicPath: '/'
  },
  html: {
    title: '沐然星'
  },
  // analysis: true,
  // theme: path.resolve('./src/assets/theme/theme.js'),  // ant-design的theme
  devServer: {
    port: '9010',
    proxy: {
      '/api': {
        // 'target': 'https://manage.metabookstore.com.cn/api/',
        'target': 'https://h5-metabooks.raysgo.com/api/',
        // 'target': 'http://localhost:8891/',
        'changeOrigin': true,
        'secure': true,
        'pathRewrite': {
          '^/api': ''
        }
      }
    }
  },
  babel: {
    dynamicImport: [
      {
        'libraryName': 'antd',
        'style': true
      },
      {
        'libraryName': '@ant-design/icons',
        'libraryDirectory': 'lib/icons',
        'camel2DashComponentName': false
      }
    ]
  },
  webpackChain: function(chain) {
    chain.externals({
      'react': 'React',
      'react-dom': 'ReactDOM'
    });

  }
};
