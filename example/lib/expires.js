'use strict'

module.exports = function() {

  //https://stackoverflow.com/questions/49547/how-to-control-web-page-caching-across-all-browsers
  return function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  };
}

