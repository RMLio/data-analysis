/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var xkd = require('./lib/xml-key-discovery');
var xkd2 = require('./lib/xml-single-pass-key-discovery-unsorted-array');
var xkd3 = require('./lib/xml-single-pass-key-discovery-sorted-array');
var xkd4 = require('./lib/xml-single-pass-key-discovery-bloomfilter');
var xkd5 = require('./lib/xml-single-pass-key-discovery-bloomfilter-extra-array');
var xkd6 = require('./lib/xml-single-pass-key-discovery-unsorted-array-with-bloomfilter');
var xkd7 = require('./lib/xml-single-pass-key-discovery-avl');

module.exports = {
  XMLKeyDiscovery: xkd,
  XMLSinglePassKeyDiscovery: xkd2,
  XMLSinglePassKeyDiscoverySortedArray: xkd3,
  XMLSinglePassKeyDiscoveryBloomFilter: xkd4,
  XMLSinglePassKeyDiscoveryBloomFilterExtraArray: xkd5,
  XMLSinglePassKeyDiscoveryUnsortedArrayWithBloomFilter: xkd6,
  XMLSinglePassKeyDiscoveryAVL: xkd7
};