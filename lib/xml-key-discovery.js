/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var PriorityQueue = require('priorityqueuejs');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;

var XMLKeyDiscovery = function(xml) {
  var doc = new dom().parseFromString(xml);
  var nodes;
  var p_a, p_a2;

  function discover(nodePath, debug) {
    var solutions = [];

    nodes = xpath.select(nodePath, doc);

    //console.log("Looking for paths...");
    p_a = paths(nodePath);
    //console.log(p_a);
    //console.log("Sorting by score...");
    sortByScore(p_a);
    //console.log(p_a);

    p_a2 = [];

    for (var i = 0; i < p_a.length; i ++) {
      p_a2.push(p_a[i].paths);
    }

    if (score(p_a2) >= 1) {
      if (debug) {
        console.log("all nodes are unique");
      }

      var q = new PriorityQueue(function(a, b) {
        return a.priority - b.priority;
      });

      q.enq({priority: 0, paths: []});

      while (!q.isEmpty()) {
        var p  = q.deq();
        p = ro(p.paths);


        for (var i = 0; i < p.length; i ++) {

          var s = score(p[i]);
          if (s == 1) {
            solutions.push(p[i]);
          } else {
            q.enq({paths: p[i], priority: s})
          }

          //console.log(q.size());
        }
      }
    }

    //console.log(solutions);
    return solutions;
  }

  function paths(nodePath) {
    var node = nodes[0];
    var attributes = node.attributes;

    var possiblePaths = generatePaths("", attributes);

    possiblePaths = possiblePaths.concat(generateChildPath("", node));

    for (var i = 0; i < possiblePaths.length; i ++) {
      var j = 0;

      while (j < nodes.length && xpath.select(possiblePaths[i], nodes[j]).length == 1) {
        j ++;
      }

      if (j < nodes.length) {
        //console.log("j = " + j);
        //console.log(nodes[i]);
        //console.log(possiblePaths[i]);
        //console.log(xpath.select(possiblePaths[i], nodes[j]).length);
        possiblePaths.splice(i, 1);
        i --;
      }
    }

    var r = [];

    for (var i = 0; i < possiblePaths.length; i ++) {
      r.push({paths: [possiblePaths[i]], priority: -1});
    }

    return r;
  }

  function generateChildPath(nodePath, node) {
    var paths = [];

    for (var i = 0; i < node.childNodes.length; i ++) {
      var t = nodePath + node.childNodes[i].nodeName;

      if (paths.indexOf(t) != -1) {
        paths.splice(paths.indexOf(t), 1);
      } else {
        paths.push(t);
      }
    }

    return paths;
  }

  function generatePaths(nodePath, attributes) {
    var result = [];

    for (var i = 0; i < attributes.length; i ++) {
      result.push(nodePath + "@" + attributes[i].nodeName);
    }

    return result;
  }

  function discriminant(s1, s2, p) {
    var i = 0;
    var stop = false;

    while (i < p.length && !stop) {
      var r1 = xpath.select1(p[i], s1);
      var r2 = xpath.select1(p[i], s2);

      isAttribute = p[i].indexOf('@') != -1;

      if (isAttribute) {
        if (!r1.specified || !r2.specified) {
          //console.log("score..");
          //console.log(p);
          //console.log("not found");
          stop = true;
        }

        if (!stop && r1.nodeValue != r2.nodeValue) {
          //console.log("score..");
          //console.log(p);
          //console.log("different value");
          stop = true;
        }
      } else {
        if (!r1.childNodes || !r2.childNodes) {
          //console.log("score..");
          //console.log(p);
          //console.log("not found");
          //console.log(r1);
          //console.log(r2);
          stop = true;
        }

        if (!stop && r1.childNodes[0].nodeValue != r2.childNodes[0].nodeValue) {
          //console.log("score..");
          //console.log(p);
          //console.log("different value");
          stop = true;
        }
      }

      i ++;
    }

    return stop;
  }

  function score(p) {
    var result = 0;

    for (var i = 0; i < nodes.length; i ++) {
      var j = 0;
      var stop = false;

      while (j < nodes.length && !stop) {
        if (i != j) {
          stop = !discriminant(nodes[i], nodes[j], p);
        }

        j ++;
      }

      if (!stop) {
        result ++;
      }
    }

    return result / nodes.length;
  }

  function sortByScore(p) {
    for (var i = 0; i < p.length; i ++) {
      p[i].priority = score(p[i].paths);
    }

    p.sort(function(a, b) {
      return b.priority - a.priority;
    });
  }

  function ro(p) {
    //console.log('ro');
    if (p.length == 0) {
      return p_a2;
    } else {
      var i = 0;

      //console.log(p);
      //console.log(p_a2);

      while(i < p_a2.length && p.indexOf(p_a2[i][0]) == -1) {
        i ++;
      }

      var highestPriorityIndex = i;
      //console.log('index = ' + highestPriorityIndex);

      var results = [];

      i = 0;

      while (i < highestPriorityIndex) {
        results.push(p.concat(p_a2[i]));
        i ++;
      }

      return results;
    }
  }


  return {
    discover: discover
  };
};

module.exports = {
  XMLKeyDiscovery: XMLKeyDiscovery
};