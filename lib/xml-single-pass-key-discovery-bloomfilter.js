/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var BinarySearchTree = require('binary-search-tree').BinarySearchTreeBloomFilter;
var winston = require('winston');
var BloomFilter = require('bloomfilter').BloomFilter;
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var utilities = require('./utilities');
var Abstract = require('./abstract-xml-single-pass-key-discovery').AbstractXMLSinglePassKeyDiscovery;

function XMLSinglePassKeyDiscoveryBloomFilter(xml, bits, hash) {
  this.bits = bits;
  this.hash = hash;

  Abstract.call(this, xml);
}

XMLSinglePassKeyDiscoveryBloomFilter.prototype = new Abstract();
XMLSinglePassKeyDiscoveryBloomFilter.prototype.constructor = XMLSinglePassKeyDiscoveryBloomFilter;

XMLSinglePassKeyDiscoveryBloomFilter.prototype.processTree = function (tree, i, value, path) {
  var foundNodes = new BloomFilter(this.bits, this.hash);

  if (tree) {
    foundNodes = tree.insert(value, i);
  } else {
    var bst = new BinarySearchTree({bits: this.bits, hash: this.hash});
    bst.insert(value, i);
    this.content[path] = bst;
  }

  return foundNodes
};

XMLSinglePassKeyDiscoveryBloomFilter.prototype.atLeastOneNodeInAllGroups = function (groups, index) {
  winston.silly('groups = ');
  winston.silly(groups);
  var firstGroup = groups[0];
  var stop = false;

  var i = 0;

  while (i < index && !stop) {
    if (firstGroup.test(i)) {

      var j = 1;

      while (j < groups.length && groups[j].test(i)) {
        j++;
      }

      stop = (j >= groups.length);
    }

    i++;
  }

  return stop;
};

module.exports = {
  XMLSinglePassKeyDiscoveryBloomFilter: XMLSinglePassKeyDiscoveryBloomFilter
};