# express-combo-middleware

## Description

this module serve express, espespecially for request to combo js or css. if you send a request like that;

```
http://localhost:7002/production/-/cms/1.1.0/0.js,1.js,3.js

or

http://localhost:7002/-/production/cms/1.1.0/0.js,1.js,3.js
```

you will get following message，just like:

```
/** @combo /production/cms/1.1.0/0.js **/
console.log("0.js")
/** @combo /production/cms/1.1.0/1.js **/
console.log("1.js")
/** @combo /production/cms/1.1.0/3.js **/
console.log("3.js")
```

## Usage

### combo.config.js
first, you have to provide a `combo.config.js`, Just like below

```js
module.exports = {
  env: 'dev',
  auth: false,
  path: '/Users/mujianguo/personal/codehub/express-combojs/data',
  port:  7002,
}
```
express-combo will Read the configuration. `path` is your asset folder.

### Install
```
$ npm install express-combojs --save
```
### Use

then, you can require it in your express app; just like it;
```
app.use(require('express-combojs')())
or 
app.use(require('express-combojs')({
  comboUrlRule: XXX
  split: XXX
}))
```

## example 

In order to you test, i provide a example for you.

then, you can git clone to test.

```
$ git clone 
$ cd express-combo/example
$ npm install
$ npm start
$ open http://localhost:7002/-/production/cms/1.1.0/0.js,1.js,3.js
```

just have fun;

## Options API

| Property| Description | Default |
|----|----|----|
|comboUrlRule| match rule | `/^\/(\w+\/)?\-\//`|
|split| separator | `,` |





