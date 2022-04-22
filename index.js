'use strict';

const path = require('path');
const EOL = require('os').EOL;
const url = require('url');
// const config = require('./combo.config.js')
const config = require(path.join(process.cwd(),"combo.config.js"));
const fileutil = require('fileutil')

const defaultComboUrlRule = /^\/(\w+\/)?\-\//;

/** @request:
 * http://localhost:7002/production/-/cms/1.1.0/0.js,1.js,3.js
 * @response:
 * @combo /cms/1.1.0/0.js
 * console.log("0.js")
 * 
 * @combo /cms/1.1.0/1.js
 * console.log("1.js")
 * 
 * @combo /cms/1.1.0/3.js 
 * console.log("3.js")
 * @param {*} options 
 */

module.exports = function(options) {
  options = options || {}

  // set combo url rule
  let comboUrlRule = options.comboUrlRule || defaultComboUrlRule;
  let comboSplit = options.split || ','

  //  return middleware function
  return function(req, res, next) {
    //parser query
    const pathname = url.parse(req.url).pathname;
    let env
    let ismatched = pathname.match(comboUrlRule);
    if (!ismatched) {
      return next();
    }
    
    if (ismatched[1]) {
      env = ismatched[1].replace(/\//, '');
    }
    
    // get rootPath dir
    let rootPath = config.path;
    if (env) {
      rootPath = path.join(rootPath, env)
    }
    if (config.env === 'dev') {
      rootPath = path.join(rootPath)
    }
    const gUrl = pathname.replace(comboUrlRule, '/')
    let ext = path.extname(gUrl.toLowerCase());
    if (!ext || ext === '.') {
      ext = '.js'
    }
    
    let arr = gUrl.split(comboSplit);
    let currentDirstore;
    let handleArr=[];
    arr.map((item, p) => {
      if (item.charAt(0) === '/') {
        currentDirstore = path.dirname(item);
        handleArr.push(item);
      } else {
        handleArr.push(path.join(currentDirstore, item));
      }
    })

    let hasError =  false;
    let fileContent = [];
    handleArr.forEach(item => {
      const filePath = path.join(rootPath, item)
      try {
        if (fileutil.isFile(filePath)) {
          fileContent.push(`/** @combo ${item} **/`);
          fileContent.push(fileutil.read(filePath));
        } else {
          hasError = true;
        }
      } catch(err) {
        hasError = true;
      }
    })

    // if get Error, return 404
    if (hasError) {
      return res.status(404).end('');
    }
    res.type(ext).end(fileContent.join(EOL));
  }
}