seatransform
============

transform AMD/CommonJS/Module to CMD

[![NPM version](https://badge.fury.io/js/seatransform.png)](https://npmjs.org/package/seatransform)
[![Build Status](https://travis-ci.org/seajs/seatransform.svg?branch=master)](https://travis-ci.org/seajs/seatransform)

## API

* transform(code:String):String
  * transform source code to CMD
  * for CommonJs it will wrap define
  * for AMD it will:
    * delete `define.AMD` and `define.AMD.xxx`
    * modify the factory params to `require, exports, module`
    * add dependence by `var dependence = require("dependence")` in factory top
  * for ES6 module it will:
    * transform module from: `var dependence = require("dependence")`
    * transform import from: `var property;!function(){var _0_=require("dependence");property=_0_.property;}();`
    * also support alias: `var alias;!function(){var _0_=require("dependence");alias=_0_.property;}();`
    * export var and function: `var v;function f(){};exports.v=v;exports.f=f;`
    * export default: `module.exports=something;`
  * for ES6 it will transform to ES5
  * otherwise it will return your source code
  
## INSTALL

```
npm install seatransform
```