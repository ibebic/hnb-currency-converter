'use strict';

const request = require('request');

var url = 'http://www.hnb.hr/hnb-tecajna-lista-portlet/rest/tecajn/getformatedrecords.dat';

request(url, function (error, response, html) {
  var val = parseFloat(process.argv[2].replace(',', '.'));
  var source = process.argv[3].toUpperCase();
  var dest = process.argv[5].toUpperCase();

  if (!error) {
    var lines = html.split('\n');
    var obj = [];
    obj[lines.length] = { curr: 'HRK', unit: 1, buy: 1, avg: 1, sell: 1 };
    for (var i = 1; i < lines.length; i++) {
      var curr = lines[i].substring(3, 6);
      var unit = parseInt(lines[i].substring(6, 9), 10);
      var buy = parseFloat(lines[i].substring(16, 25).replace(',', '.'));
      var avg = parseFloat(lines[i].substring(31, 40).replace(',', '.'));
      var sell = parseFloat(lines[i].substring(46, 55).replace(',', '.'));
      // console.log(curr + ' ' + unit + ' ' + buy + ' ' + avg + ' ' + sell);
      obj[i] = { curr: curr, unit: unit, buy: buy, avg: avg, sell: sell };
    }
    // original format
    var initial = obj.filter(function (obj) {
      return obj.curr === source;
    });
    // target format
    var target = obj.filter(function (obj) {
      return obj.curr === dest;
    });
    // amount
    var result = parseFloat(parseFloat(val) * parseFloat(initial[0].avg) / parseFloat(target[0].avg)).toFixed(6);
    console.log(val + ' ' + source + ' = ' + result + ' ' + dest);
  }
});
