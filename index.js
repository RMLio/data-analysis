/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var xkd = require('./lib/xml-key-discovery');
var xkd2 = require('./lib/xml-single-pass-key-discovery');
var xkd3 = require('./lib/xml-single-pass-key-discovery-sorted-array');
var xkd4 = require('./lib/xml-single-pass-key-discovery-bloomfilter');
var xkd5 = require('./lib/xml-single-pass-key-discovery-bloomfilter-extra-array');
var xkd6 = require('./lib/xml-single-pass-key-discovery-unsorted-array-with-bloomfilter');

module.exports = {
  XMLKeyDiscovery: xkd.XMLKeyDiscovery,
  XMLSinglePassKeyDiscovery: xkd2.XMLSinglePassKeyDiscovery,
  XMLSinglePassKeyDiscoverySortedArray: xkd3.XMLSinglePassKeyDiscoverySortedArray,
  XMLSinglePassKeyDiscoveryBloomFilter: xkd4.XMLSinglePassKeyDiscoveryBloomFilter,
  XMLSinglePassKeyDiscoveryBloomFilterExtraArray: xkd5.XMLSinglePassKeyDiscoveryBloomFilterExtraArray,
  XMLSinglePassKeyDiscoveryUnsortedArrayWithBloomFilter: xkd6.XMLSinglePassKeyDiscovery
};