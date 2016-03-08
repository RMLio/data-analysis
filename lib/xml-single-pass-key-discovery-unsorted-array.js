/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var BinarySearchTree = require('binary-search-tree').BinarySearchTree;
var winston = require('winston');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var utilities = require('./utilities');
var Abstract = require('./abstract-xml-single-pass-key-discovery').AbstractXMLSinglePassKeyDiscovery;

function XMLSinglePassKeyDiscovery(xml) {
  Abstract.call(this, xml);
}

XMLSinglePassKeyDiscovery.prototype = new Abstract();
XMLSinglePassKeyDiscovery.prototype.constructor = XMLSinglePassKeyDiscovery;

XMLSinglePassKeyDiscovery.prototype.processTree = function (tree, i, value, path) {
  var foundNodes = [];

  if (tree) {
    foundNodes = tree.insert(value, i);
  } else {
    var bst = new BinarySearchTree();
    bst.insert(value, i);
    this.content[path] = bst;
  }

  return foundNodes;
};

XMLSinglePassKeyDiscovery.prototype.atLeastOneNodeInAllGroups = function (groups, index) {
  winston.silly('groups = ');
  winston.silly(groups);
  var firstGroup = groups[0];
  var stop = false;
  var i = 0;

  while (i < firstGroup.length && !stop) {
    if (firstGroup[i] != index) {
      var j = 1;

      while (j < groups.length && groups[j].indexOf(firstGroup[i]) != -1) {
        j++;
      }

      stop = (j >= groups.length);
    }

    i++;
  }

  return stop;
};

module.exports = XMLSinglePassKeyDiscovery;