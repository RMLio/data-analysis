/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 3/3/16.
 */

var validator = require('validator');

function analyseValue(analysis, path, value) {
  if ("@@UNDEFINED@@" === value) {
    value = null;
  }

  var type = 0;

  //check datatype
  if (value) {
    type += 1;

    if (!isNaN(value)) {
      type += 2;
    }

    if (validator.isDate(value)) {
      type += 3;
    }
  }

  if (!analysis[path]) {
    analysis[path] = {types: {0: 0, 1: 0, 3: 0, 4: 0, 6: 0}};
  }

  analysis[path].types[type] ++;

  if (type == 3 || type == 6) {
    value = validator.toFloat(value);
    if (!analysis[path].max) {
      analysis[path].max = value;
      analysis[path].min = value;
      analysis[path].average = value;
      analysis[path].total = value;
    } else {
      if (value > analysis[path].max) {
        analysis[path].max = value;
      } else if (value < analysis[path].min) {
        analysis[path].min = value;
      }

      analysis[path].total += value;
      var all = analysis[path].types[3] + analysis[path].types[6];

      analysis[path].average = analysis[path].total / all;
    }
  }

  //fill histogram
}

function ro(p, p_a) {
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

function getPaths(nodes, multiLevel) {
  var possiblePaths = [];

  for (var i = 0; i < nodes.length; i++) {
    var p = generateAllPaths("", nodes[i], true, 0, multiLevel);

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

function generateAllPaths(nodePath, node, first, level, multiLevel) {
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
        r = generateAllPaths("", node.childNodes[i], false, level + 1, multiLevel);
      } else {
        r = generateAllPaths(nodePath + node.nodeName + "/", node.childNodes[i], false, level + 1, multiLevel);
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

var Utilities = {
  analyseValue: analyseValue,
  ro: ro,
  getPaths: getPaths,
  generateAllPaths: generateAllPaths
};

module.exports = Utilities;