/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var xkd = require('./lib/xml-key-discovery');
var xkd2 = require('./lib/xml-single-pass-key-discovery');

module.exports = {
  XMLKeyDiscovery: xkd.XMLKeyDiscovery,
  XMLSinglePassKeyDiscovery: xkd2.XMLSinglePassKeyDiscovery
};