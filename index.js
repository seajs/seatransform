var ranma = require('ranma')

exports.transform = function(code) {
  var type = ranma.type.analyse(code)

  if(type.isCMD) {
    return code
  }
  else if(type.isModule || type.isAMD || type.isCommonJS) {
    return ranma.cmdify(type.code)
  }
  else if(type.es6) {
    return type.code
  }
  return code;
}