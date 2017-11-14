'use strict';

module.exports = function(app) {
  
  app.post('/', function(req, res) {
    res.end("test")
  })
};