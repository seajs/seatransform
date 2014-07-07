var seatransform = require('../')

var expect = require('expect.js')

describe('amd2cmd', function() {
  it('define.amd', function() {
    var s = 'if(define && define.amd) { define({}) }'
    var res = seatransform.transform(s)
    expect(res).to.eql('if(define ) { define({}) }')
  })
  it('define.amd.jQuery', function() {
    var s = 'if(define && define.amd && define.amd.jQuery) { define({}) }'
    var res = seatransform.transform(s)
    expect(res).to.eql('if(define ) { define({}) }')
  })
  it('no deps', function() {
    var s = 'define(function(){})'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module){})')
  })
  it('with deps', function() {
    var s = 'define(["a"], function(a){})'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(["./a"], function(require, exports, module){var a = require("./a");})')
  })
})

describe('cjs2cmd', function() {
  it('wrap define', function() {
    var s = 'exports.a = 1'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module) {exports.a = 1});')
  })
})

describe('module2cmd', function() {
  it('export default', function() {
    var s = 'export default a'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module) {exports.default=a});')
  })
  it('export var', function() {
    var s = 'export var a'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module) {var a;exports.a=a});')
  })
  it('export function', function() {
    var s = 'export function a(){}'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module) {exports.a=a;function a(){}});')
  })
  it('module from', function() {
    var s = 'module a from "a"'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module) {var a=require("a");});')
  })
  it('import from', function() {
    var s = 'import a from "a"'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module) {var a=require("a");});')
  })
  it('import as from', function() {
    var s = 'import {a as b, c} from "a"'
    var res = seatransform.transform(s)
    expect(res).to.eql('define(function(require, exports, module) {var b;var c;!function(){var _0_=require("a");b=_0_.a;c=_0_.c;}();});')
  })
})

describe('ignore other', function() {
  it('noncmd', function() {
    var s = 'var define = 1'
    var res = seatransform.transform(s)
    expect(res).to.eql('var define = 1')
  })
  it('es6', function() {
    var s = 'function require(a = 1){}'
    var res = seatransform.transform(s)
    expect(res).to.eql('function require(a){if(a===void 0)a=1;}')
  })
})