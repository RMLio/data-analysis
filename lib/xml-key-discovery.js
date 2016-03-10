/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var PriorityQueue = require('priorityqueuejs');
var winston = require('winston');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var utilities = require('./utilities');

var XMLKeyDiscovery = function (xml) {
  var doc = new dom().parseFromString(xml);
  var nodes;
  var p_a = [], p_a2 = [];
  var multiLevel = true;
  var extendedOutput = false;
  var pruning = false;
  var analysis = {};

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

    if (nodes.length == 0) {
      winston.warn('no nodes were found using \'' + nodePath + '\'');
    } else {
      winston.info("looking for paths ...");
      p_a = utilities.getPaths(nodes, multiLevel, true);
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
        structure: structure
      }
    } else {
      return solutions;
    }
  }

  function discriminant(s1, s2, p, analyseValues) {
    winston.silly('discriminant: p = ' + p);

    var i = 0;
    var stop = false;

    while (i < p.length && (!stop || analyseValues)) {
      var isAttribute = p[i].indexOf('@') != -1;

      if (isAttribute) {
        var r1 = xpath.select1(p[i], s1);
        var r2 = xpath.select1(p[i], s2);

        if (!r1 || !r2) {
          if (!(!r1 && !r2)) {
            stop = true;
          }
        } else if (r1.nodeValue != r2.nodeValue) {
          stop = true;
        }

        if (analyseValues) {
          if (!r1) {
            utilities.analyseValue(analysis, p[i], "@@UNDEFINED@@");
          } else {
            utilities.analyseValue(analysis, p[i], r1.nodeValue);
          }
        }
      } else {
        var r1 = xpath.select(p[i], s1);
        var r2 = xpath.select(p[i], s2);

        if (!r1 || !r2) {
          if (!(!r1 && !r2)) {
            stop = true;
          }
        } else if (r1.length != r2.length) {
          stop = true;
        } else {
          var j = 0;

          while (j < r1.length && (!stop || analyseValues)) {
            if (r1[j].childNodes.length == 0) {
              if (analyseValues) {
                utilities.analyseValue(analysis, p[i], "@@UNDEFINED@@");
              }
              var k = 0;

              while (k < r2.length && r2[k].childNodes.length != 0) {
                k ++;
              }

              if (k <  r2.length) {
                r2.splice(k, 1);
              } else {
                stop = true;
              }
            } else {
              var v = r1[j].childNodes[0].nodeValue;

              if (analyseValues) {
                utilities.analyseValue(analysis, p[i], v);
              }

              var k = 0;

              while (k < r2.length && r2[k].childNodes.length != 0 && r2[k].childNodes[0].nodeValue != v) {
                k ++;
              }

              if (k < r2.length) {
                r2.splice(k, 1);
              } else {
                stop = true;
              }
            }



            //if (r1[j].childNodes.length == 0 || r2[j].childNodes.length == 0) {
            //  if (!(r1[j].childNodes.length == 0 && r2[j].childNodes.length == 0)) {
            //    stop = true;
            //  }
            //  //todo instead of != I need to do indexOf or something similar
            //} else if (r1[j].childNodes[0].nodeValue != r2[j].childNodes[0].nodeValue) {
            //  stop = true;
            //}

            j++;
          }
        }
      }

      i++;
    }

    return stop;
  }

  function score(p, analyseValues) {
    var originalAnalyseValues = analyseValues;
    var result = 0;

    for (var i = 0; i < nodes.length; i++) {
      var j = 0;
      var stop = false;

      while (j < nodes.length && !stop) {
        if (i != j) {
          stop = !discriminant(nodes[i], nodes[j], p, analyseValues);
          analyseValues = false;
        }

        j++;
      }

      if (!stop) {
        result++;
      }

      analyseValues = originalAnalyseValues;
    }

    return result / nodes.length;
  }

  function sortByScore(p) {
    for (var i = 0; i < p.length; i++) {
      p[i].priority = score(p[i].paths, true);
    }

    p.sort(function (a, b) {
      return b.priority - a.priority;
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

  return {
    discover: discover
  };
};

module.exports = XMLKeyDiscovery;