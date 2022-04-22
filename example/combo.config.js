const path = require('path')

module.exports = {
  env: 'test',
  auth: false,
  path: path.join( __dirname, '..', 'cdn'),
  comboSplit: ',',
  comboUrlRule: /^\/(\w+\/)?\-\//,
  port:  7002,
}