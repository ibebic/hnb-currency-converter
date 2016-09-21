#!/usr/bin/env node

'use strict';

const getExchangeRecords = require('./parser.js');
const helpers = require('./helpers.js');
const toUpper = helpers.toUpper;
const toFloat = helpers.toFloat;
const parseArgs = helpers.parseArgs;

// Parse user input. [ amount source _ dest ]
let args = process.argv.slice(2);
const arr = parseArgs(args);
const val = toFloat(arr[0]);
const source = toUpper(arr[1]);
const dest = toUpper(arr[2]);

// Fetch exchange rates and do actual conversion.
getExchangeRecords()
  .then(records => exchange(records, source, dest, val))
  .then(outVal => console.log(`${ val } ${ source } = ${ outVal } ${ dest }`))
  .catch(err => console.error('Error:', err.message));

function exchange(records, sourceCurr, destCurr, val) {
  let source = records[sourceCurr];
  let dest = records[destCurr];

  return ((val * source.avg) / dest.avg).toFixed(6);
}
