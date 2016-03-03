/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var BinarySearchTree = require('binary-search-tree').BinarySearchTreeBloomFilter;
var winston = require('winston');
var BloomFilter = require('bloomfilter').BloomFilter;
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;

var XMLSinglePassKeyDiscoveryBloomFilter = function (xml, bits, hash) {
  var doc = new dom().parseFromString(xml);
  var nodes;
  var p_a;
  var multiLevel = true;
  var extendedOutput = false;
  var content = [];

  function discover(nodePath, config) {
    if (config) {
      if (config.logLevel) {
        winston.level = config.logLevel;
      }

      multiLevel = config.multiLevel;
      extendedOutput = config.extendedOutput;
    }

    nodes = xpath.select(nodePath, doc);

    if (nodes.length == 0) {
      winston.warn('no nodes were found using \'' + nodePath + '\'');
    } else {
      winston.info("looking for paths ...");
      p_a = getPaths();
      var singleKeyPathsCount = p_a.length;

      winston.debug(p_a);

      for (var i = 0; i < p_a.length; i++) {
        p_a = p_a.concat(ro(p_a[i]));
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
                  if (!selectResult[n].firstChild) {
                    tempValues.push("@@UNDEFINED@@");
                  } else {
                    tempValues.push(selectResult[n].firstChild.nodeValue);
                  }
                }

                tempValues.sort();
                value = tempValues.join();
              } else {
                value = "@@UNDEFINED@@";
              }
            }

            winston.silly('value = ' + value);
            var tree = content[path];
            var foundNodes;

            foundNodes = new BloomFilter(bits, hash);

            if (tree) {
              foundNodes = tree.insert(value, i);
            } else {
              var bst = new BinarySearchTree({bits: bits, hash: hash});
              bst.insert(value, i);
              content[path] = bst;
            }

            foundNodesGroup.push(foundNodes);
          }

          if (atLeastOneNodeInAllGroups(foundNodesGroup, i)) {
            winston.debug('removed ' + p_a[j]);
            p_a.splice(j, 1);
            j--;
          }

          //winston.silly('done ' + i);
        }
      }
    }


    if (extendedOutput) {
      return {
        keys: p_a,
        nodeCount: nodes.length
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

    while (i < index && !stop) {
      if (firstGroup.test(i)) {

        var j = 1;

        while (j < groups.length && groups[j].test(i)) {
          j++;
        }

        stop = (j >= groups.length);
      }

      i ++;
    }

    return stop;
  }

  function getPaths() {
    var possiblePaths = [];

    for (var i = 0; i < nodes.length; i++) {
      var p = generateAllPaths("", nodes[i], true, 0);

      for (var j = 0; j < p.length; j++) {
        if (possiblePaths.indexOf(p[j]) == -1) {
          possiblePaths.push(p[j]);
        }
      }
    }

    var r = [];

    for (var i = 0; i < possiblePaths.length; i++) {
      r.push([possiblePaths[i]]);
    }

    return r;

  }

  function generateAllPaths(nodePath, node, first, level) {
    var paths = [];

    if (multiLevel || (!multiLevel && level < 1)) {
      var attributes = node.attributes;

      //generate path for attributes of node
      for (var i = 0; i < attributes.length; i++) {
        var t;
        if (first) {
          var t = "@" + attributes[i].nodeName;
        } else {
          t = nodePath + node.nodeName + "/@" + attributes[i].nodeName;
        }

        if (paths.indexOf(t) == -1) {
          paths.push(t);
        }
      }
    }

    for (var i = 0; i < node.childNodes.length; i++) {
      //text node
      if (node.childNodes[i].nodeType == 3) {
        var t = nodePath + node.nodeName;

        if (paths.indexOf(t) == -1) {
          paths.push(t);
        }
      } else if (multiLevel || (!multiLevel && level < 2)) {
        var r;

        if (first) {
          r = generateAllPaths("", node.childNodes[i], false, level + 1);
        } else {
          r = generateAllPaths(nodePath + node.nodeName + "/", node.childNodes[i], false, level + 1);
        }

        for (var j = 0; j < r.length; j++) {
          if (paths.indexOf(r[j] == -1)) {
            paths.push(r[j]);
          }
        }
      }
    }

    return paths;
  }

  function ro(p) {
    var i = 0;

    while (i < p_a.length && p.indexOf(p_a[i][0]) == -1) {
      i++;
    }

    var highestPriorityIndex = i;

    var results = [];

    i = 0;

    while (i < highestPriorityIndex) {
      results.push(p.concat(p_a[i]));
      i++;
    }

    return results;
  }

  return {
    discover: discover
  };
};

module.exports = {
  XMLSinglePassKeyDiscoveryBloomFilter: XMLSinglePassKeyDiscoveryBloomFilter
};