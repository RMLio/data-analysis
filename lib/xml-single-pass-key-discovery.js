/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var BinarySearchTree = require('binary-search-tree').BinarySearchTree;
var winston = require('winston');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var utilities = require('./utilities');

var XMLSinglePassKeyDiscovery = function (xml) {
  var doc = new dom().parseFromString(xml);
  var nodes;
  var p_a = [];
  var multiLevel = true;
  var extendedOutput = false;
  var content = [];
  var pathWithAllKeysValid = true;
  var analysis = {};

  function discover(nodePath, config) {
    if (config) {
      if (config.logLevel) {
        winston.level = config.logLevel;
      }

      if (config.multiLevel != undefined) {
        multiLevel = config.multiLevel;
      }

      extendedOutput = config.extendedOutput;
    }

    nodes = xpath.select(nodePath, doc);

    if (nodes.length == 0) {
      winston.warn('no nodes were found using \'' + nodePath + '\'');
    } else {
      winston.info("looking for paths ...");
      p_a = utilities.getPaths(nodes, multiLevel);
      var singleKeyPathsCount = p_a.length;
      var structure = utilities.getStructure(p_a);
      //console.log(structure);

      winston.debug(p_a);

      for (var i = 0; i < p_a.length; i++) {
        p_a = p_a.concat(utilities.ro(p_a[i], p_a));
      }

      winston.debug(p_a);

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        for (var j = 0; j < p_a.length; j++) {
          var paths = p_a[j];
          winston.silly('paths = ' + paths);
          var foundNodesGroup = [];

          for (var k = 0; k < paths.length; k++) {
            var path = paths[k];
            winston.silly('path = ' + path);

            var value;

            if (path.indexOf('@') != -1) {
              var selectResult = xpath.select1(path, node);

              if (selectResult) {
                value = selectResult.nodeValue;
              } else {
                value = "@@UNDEFINED@@";
              }
            } else {
              selectResult = xpath.select(path, node);

              if (selectResult.length > 0) {
                var tempValues = [];

                for (var n = 0; n < selectResult.length; n++) {
                  var temp;

                  if (!selectResult[n].firstChild) {
                    temp = "@@UNDEFINED@@";
                  } else {
                    temp = selectResult[n].firstChild.nodeValue;
                  }

                  if (paths.length == singleKeyPathsCount) {
                    utilities.analyseValue(analysis, path, temp);
                  }

                  tempValues.push(temp);
                }

                tempValues.sort();
                value = tempValues.join();
              } else {
                value = "@@UNDEFINED@@";
              }
            }

            winston.silly('value = ' + value);
            var tree = content[path];
            var foundNodes = [];

            if (tree) {
              foundNodes = tree.insert(value, i);
            } else {
              var bst = new BinarySearchTree();
              bst.insert(value, i);
              content[path] = bst;
            }

            foundNodesGroup.push(foundNodes);

          }

          if (singleKeyPathsCount == p_a[j].length) {
            if (pathWithAllKeysValid && atLeastOneNodeInAllGroups(foundNodesGroup, i)) {
              pathWithAllKeysValid = false;
            }
          } else if (atLeastOneNodeInAllGroups(foundNodesGroup, i)) {
            winston.debug('removed ' + p_a[j]);
            p_a.splice(j, 1);
            j--;
          }

          //winston.silly('done ' + i);
        }
      }
    }

    if (!pathWithAllKeysValid) {
      p_a = p_a.splice(p_a.length - 1, 1);
    }

    if (extendedOutput) {
      return {
        keys: p_a,
        nodeCount: nodes.length,
        analysis: analysis,
        structure: structure
      }
    } else {
      return p_a;
    }
  }

  function atLeastOneNodeInAllGroups(groups, index) {
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
  }

  return {
    discover: discover
  };
};

module.exports = {
  XMLSinglePassKeyDiscovery: XMLSinglePassKeyDiscovery
};