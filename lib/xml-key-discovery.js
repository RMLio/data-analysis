/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var PriorityQueue = require('priorityqueuejs');
var winston = require('winston');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var utilities = require('./utilities');
var AVLTree = require('binary-search-tree').AVLTree;
var BinarySearchTree = require('binary-search-tree').BinarySearchTree;

var XMLKeyDiscovery = function (xml) {
  var doc = new dom().parseFromString(xml);
  var startMemUsage = process.memoryUsage();
  var nodes;
  var p_a = [], p_a2 = [];
  var multiLevel = true;
  var extendedOutput = false;
  var pruning = false;
  var analysis = {};
  var nodesTree;
  var objectsTree;

  winston.level = "error";

  function discover(nodePath, config) {
    if (config) {
      if (config.logLevel) {
        winston.level = config.logLevel;
      }

      if (config.multiLevel != undefined) {
        multiLevel = config.multiLevel;
      }

      extendedOutput = config.extendedOutput;
      pruning = config.pruning;
    }

    var solutions = [];

    nodes = xpath.select(nodePath, doc);
    var startTime = new Date().getTime();

    if (nodes.length == 0) {
      winston.warn('no nodes were found using \'' + nodePath + '\'');
    } else {
      winston.info("looking for paths ...");
      p_a = utilities.getPaths(nodes, multiLevel, true);
      buildTree(nodes, p_a)
      var structure = utilities.getStructure(p_a, true);

      winston.debug(p_a);

      winston.info("sorting paths ...");
      sortByScore(p_a);

      winston.debug(p_a);

      p_a2 = [];
      var p_a3 = [];

      for (var i = 0; i < p_a.length; i++) {
        p_a2.push(p_a[i].paths);
        p_a3.push(p_a[i].paths[0]);
      }

      if (score(p_a3, false) >= 1) {
        winston.info("all nodes are unique");

        var q = new PriorityQueue(function (a, b) {
          return a.priority - b.priority;
        });

        q.enq({priority: 0, paths: []});

        while (!q.isEmpty()) {
          var p = q.deq();
          p = ro(p.paths);

          for (var i = 0; i < p.length; i++) {

            var s = score(p[i], false);
            if (s == 1) {
              winston.info('solution found: ' + p[i]);

              solutions.push(p[i]);
            }

            if (!pruning || (pruning && s != 1)) {
              q.enq({paths: p[i], priority: s});
            }
          }
        }
      }
    }

    if (extendedOutput) {
      return {
        keys: solutions,
        nodeCount: nodes.length,
        analysis: analysis,
        structure: structure,
        startTime: startTime,
        startMemUsage: startMemUsage
      }
    } else {
      return solutions;
    }
  }

  function amountOfNodesInAllGroups(groups) {
    winston.silly('groups = ');
    winston.silly(groups);
    var firstGroup = groups[0];
    var amount = 0;

    for (var i = 0; i < firstGroup.length; i ++) {
      var j = 1;

      while (j < groups.length && groups[j].indexOf(firstGroup[i]) != -1) {
        j++;
      }

      if (j >= groups.length) {
        amount++;
      }
    }

    return amount;
  }

  function score(paths, analyseValues) {
    var result = 0;

    for (var i = 0; i < nodes.length; i++) {
      var dataI = nodesTree.search(i)[0];
      //console.log(dataI);

      var groups = [];

      for (var j = 0; j < paths.length; j++) {
        var path = paths[j];
        winston.debug(path);
        var datas = objectsTree.search(hash(path + " @@@ " + dataI[path]));

        winston.debug(datas);

        var found = [];

        for (var k = 0; k < datas.length; k++) {
          if (datas[k][path] == dataI[path] && found.indexOf(datas[k]['@@id@@']) == -1) {
            found.push(datas[k]['@@id@@']);
          }
        }

        groups.push(found);
      }

      if (amountOfNodesInAllGroups(groups) == 1) {
        result++;
      }
    }

    return result / nodes.length;
  }

  function sortByScore(p) {
    for (var i = 0; i < p.length; i++) {
      p[i].priority = score(p[i].paths, false);
    }

    p.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }

  function ro(p) {
    if (p.length == 0) {
      return p_a2;
    } else {
      var i = 0;

      while (i < p_a2.length && p.indexOf(p_a2[i][0]) == -1) {
        i++;
      }

      var highestPriorityIndex = i;

      var results = [];

      i = 0;

      while (i < highestPriorityIndex) {
        results.push(p.concat(p_a2[i]));
        i++;
      }

      return results;
    }
  }

  function buildTree(nodes, paths) {
    nodesTree = new AVLTree();
    objectsTree = new BinarySearchTree();

    for (var i = 0; i < nodes.length; i ++) {
      var node = nodes[i];
      var data = {'@@id@@': i};

      for (var j = 0; j < paths.length; j ++) {
        var path = paths[j].paths[0];

        if (path.indexOf('@') != -1) {
          var selectResult = xpath.select1(path, node);

          if (selectResult) {
            value = selectResult.nodeValue;
          } else {
            value = "@@UNDEFINED@@";
          }

          utilities.analyseValue(analysis, path, value);

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

              utilities.analyseValue(analysis, path, temp);
              tempValues.push(temp);
            }

            tempValues.sort();
            value = tempValues.join();
          } else {
            value = "@@UNDEFINED@@";
          }
        }

        data[path] = value;
        //console.log(path + " @@@ " + value + " ==> " + hash(path + " @@@ " + value));
        objectsTree.insert(hash(path + " @@@ " + value), data);
      }

      nodesTree.insert(i, data);
    }
  }

  function hash(str) {
    var hash = 7;
    for (var i = 0; i < str.length; i++) {
      hash = hash*31 + str.charCodeAt(i);
    }

    return hash;
  }

  return {
    discover: discover
  };
};

module.exports = XMLKeyDiscovery;