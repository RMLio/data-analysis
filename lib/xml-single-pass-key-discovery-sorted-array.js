/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var BinarySearchTree = require('binary-search-tree').BinarySearchTreeSortedArray;
var winston = require('winston');
var SortedArray = require('sorted-array');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var utilities = require('./utilities');
var Abstract = require('./abstract-xml-single-pass-key-discovery').AbstractXMLSinglePassKeyDiscovery;

function XMLSinglePassKeyDiscoverySortedArray(xml) {
  Abstract.call(this, xml);
}

XMLSinglePassKeyDiscoverySortedArray.prototype = new Abstract();
XMLSinglePassKeyDiscoverySortedArray.prototype.constructor = XMLSinglePassKeyDiscoverySortedArray;

XMLSinglePassKeyDiscoverySortedArray.prototype.processTree = function (tree, i, value, path) {
  var foundNodes = new SortedArray([]);

  if (tree) {
    foundNodes = tree.insert(value, i);
  } else {
    var bst = new BinarySearchTree();
    bst.insert(value, i);
    this.content[path] = bst;
  }

  return foundNodes;
};

XMLSinglePassKeyDiscoverySortedArray.prototype.atLeastOneNodeInAllGroups = function (groups, index) {
  winston.silly('groups = ');
  winston.silly(groups);
  var firstGroup = groups[0];
  var stop = false;
  var i = 0;

  while (i < firstGroup.array.length && !stop) {
    if (firstGroup.array[i] != index) {
      var j = 1;

      while (j < groups.length && groups[j].search(firstGroup.array[i]) != -1) {
        j++;
      }

      stop = (j >= groups.length);
    }

    i++;
  }

  return stop;
};

module.exports = {
  XMLSinglePassKeyDiscoverySortedArray: XMLSinglePassKeyDiscoverySortedArray
};