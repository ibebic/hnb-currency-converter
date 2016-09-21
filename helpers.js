'use strict';

function toUpper(str) {
  str = str || '';
  return str.toUpperCase();
}

function toFloat(str) {
  if (!str || !str.length) return 0;
  return str.replace(',', '.');
}

function parseArgs(args) {
  var argArray = {};
  if (/^[0-9]+(\.)[0-9]+$/.test(args[0].replace(',', '.'))) {
    argArray[0] = args[0].replace(',', '.');
    argArray[1] = args[1];
    argArray[2] = args[3];
  } else {
    var myArray = args[0].replace(',', '.').split(/(\d+(\.)\d+)/);
    argArray[0] = myArray[1];
    argArray[1] = myArray[3];
    argArray[2] = args[2];
  }
  // console.log(myArray);
  return argArray;
}

module.exports = {
  toUpper,
  toFloat,
  parseArgs
};
