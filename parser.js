'use strict';

const request = require('request');
const toFloat = require('./helpers.js').toFloat;

const url = 'http://www.hnb.hr/hnb-tecajna-lista-portlet/rest/tecajn/getformatedrecords.dat';
const hrk = { curr: 'HRK', unit: 1, buy: 1, avg: 1, sell: 1 };

function parseLine(line) {
  // Swap consequtive spaces by tabs and split by them.
  let columns = line.replace(/\s+/g, '\t').split('\t');

  // Parse first column, that has following format:
  // |digit code|currency code|unit| - all sections are 3 chars wide
  let first = columns[0];
  let curr = first.substring(3, 6);
  let unit = parseInt(first.substring(6, 9), 10);

  // Parse following 3 columns.
  let buy = toFloat(columns[1]);
  let avg = toFloat(columns[2]);
  let sell = toFloat(columns[3]);

  // Create and return exchange record.
  return { curr, unit, buy, avg, sell };
}

function getExchangeRecords() {
  return new Promise((resolve, reject) => {
    request(url, (err, resp, data) => {
      if (err) {
        reject(err);
        return;
      }

      let records = { [hrk.curr]: hrk };
      data.split('\n').slice(1).forEach(line => {
        let record = parseLine(line);
        records[record.curr] = record;
      });

      resolve(records);
    });
  });
}

module.exports = getExchangeRecords;
