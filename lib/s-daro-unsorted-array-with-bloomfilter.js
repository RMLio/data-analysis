/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var BinarySearchTree = require('binary-search-tree').BinarySearchTree;
var winston = require('winston');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var BloomFilter = require('bloomfilter').BloomFilter;
var utilities = require('./utilities');
var Super = require('./s-daro-unsorted-array');

function XMLSinglePassKeyDiscovery(xml) {
  Super.call(this, xml);
}

XMLSinglePassKeyDiscovery.prototype = new Super();
XMLSinglePassKeyDiscovery.prototype.constructor = XMLSinglePassKeyDiscovery;

XMLSinglePassKeyDiscovery.prototype.atLeastOneNodeInAllGroups = function (groups, index) {
  winston.silly('groups = ');
  winston.silly(groups);
  var firstGroup = groups[0];

  var bloom = new BloomFilter(32, 4);

  for (var i = 0; i < firstGroup.length; i++) {
    if (firstGroup[i] != index) {
      bloom.add(firstGroup[i]);
    }
  }

  for (var i = 1; i < groups.length - 1; i++) {
    var g = groups[i];
    var bloom2 = new BloomFilter(32, 4);

    for (var j = 0; j < g.length; j++) {
      if (bloom.test(g[j])) {
        bloom2.add(g[j]);
      }
    }

    bloom = bloom2;
  }

  var g = groups[groups.length - 1];

  for (var j = 0; j < g.length; j++) {
    if (bloom.test(g[j])) {
      return true;
    }
  }

  return false;
};


module.exports = XMLSinglePassKeyDiscovery;