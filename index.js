/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var daro = require('./lib/daro');
var sDaro1 = require('./lib/s-daro-unsorted-array');
var sDaro2 = require('./lib/s-daro-sorted-array');
var sDaro3 = require('./lib/s-daro-bloomfilter');
var sDaro4 = require('./lib/s-daro-bloomfilter-extra-array');
var sDaro5 = require('./lib/s-daro-unsorted-array-with-bloomfilter');
var sDaro6 = require('./lib/s-daro-avl');

module.exports = {
  Daro: daro,
  SDaro: sDaro1,
  SDaroSortedArray: sDaro2,
  SDaroBloomFilter: sDaro3,
  SDaroBloomFilterExtraArray: sDaro4,
  SDaroUnsortedArrayWithBloomFilter: sDaro5,
  SDaroAVL: sDaro6
};