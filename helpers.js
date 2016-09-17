'use strict';

function toUpper(str) {
  str = str || '';
  return str.toUpperCase();
}

function toFloat(str) {
  if (!str || !str.length) return 0;
  return str.replace(',', '.');
}

module.exports = {
  toUpper,
  toFloat
};
