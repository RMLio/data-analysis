/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 3/3/16.
 */

var validator = require('validator');
var winston = require('winston');

function analyseValue(analysis, path, value) {
  if ("@@UNDEFINED@@" === value) {
    value = null;
  }

  var type = 0;

  //check datatype
  if (value) {
    //is String
    type += 1;

    //is number
    if (!isNaN(value)) {
      type += 2;
    }

    //is Date
    if (validator.isDate(value)) {
      type += 3;
    }
  }

  if (!analysis[path]) {
    analysis[path] = {types: {0: 0, 1: 0, 3: 0, 4: 0, 6: 0}};
  }

  analysis[path].types[type] ++;

  if (type == 1) {
    if (!analysis[path].averageWords) {
      analysis[path].averageWords = 0;
      analysis[path].totalWords = 0;
      analysis[path].averageCharacters = 0;
      analysis[path].totalCharacters = 0;
    }

    var words = value.split(/\s+/);
    analysis[path].totalWords += words.length;
    analysis[path].averageWords = analysis[path].totalWords/analysis[path].types[1];
    analysis[path].totalCharacters += words.join().length;
    analysis[path].averageCharacters = analysis[path].totalCharacters/analysis[path].totalWords;

  } else if (type == 3 || type == 6) {
    value = validator.toFloat(value);
    if (!analysis[path].max) {
      analysis[path].max = value;
      analysis[path].min = value;
      analysis[path].average = value;
      analysis[path].total = value;
      analysis[path].temp = {
        n: 0,
        mean: 0,
        M2: 0,
        M3: 0,
        M4: 0
      }
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

    var n1 = analysis[path].temp.n;
    analysis[path].temp.n ++;
    var delta = value - analysis[path].temp.mean;
    var delta_n = delta / analysis[path].temp.n;
    var delta_n2 = delta_n * delta_n;
    var term1 = delta * delta_n * n1;
    analysis[path].temp.mean += delta_n;
    analysis[path].temp.M4 += term1 * delta_n2* (analysis[path].temp.n * analysis[path].temp.n - 3*analysis[path].temp.n + 3) + 6 * delta_n2 * analysis[path].temp.M2 -4 * delta_n * analysis[path].temp.M3;
    analysis[path].temp.M3 += term1 * delta_n * (analysis[path].temp.n - 2) - 3 * delta_n * analysis[path].temp.M2;
    analysis[path].temp.M2 += term1;
    analysis[path].kurtosis = (analysis[path].temp.n * analysis[path].temp.M4) / (analysis[path].temp.M2 * analysis[path].temp.M2) - 3;
    analysis[path].skewness = (Math.sqrt(analysis[path].temp.n) * analysis[path].temp.M3) / (Math.pow(analysis[path].temp.M2, 3/2));
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
        t = "@" + attributes[i].nodeName;
      } else {
        t = nodePath + node.nodeName + "/@" + attributes[i].nodeName;
      }

      //console.log(t);

      if (paths.indexOf(t) == -1) {
        paths.push(t);
      }
    }
  }

  for (var i = 0; i < node.childNodes.length; i++) {
    //text node
    if (node.childNodes[i].nodeType == 3) {
      //console.log(node.childNodes[i]);

      var t = nodePath + node.nodeName;

      if (paths.indexOf(t) == -1) {
        paths.push(t);
      }

      attributes = node.childNodes[i].attributes | [];

      //generate path for attributes of node
      for (var i = 0; i < attributes.length; i++) {

        t += "/@" + attributes[i].nodeName;

        //console.log(t);

        if (paths.indexOf(t) == -1) {
          paths.push(t);
        }
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

function getStructure(paths) {
  var structure = {attributes: [], children: []};

  var p = [];

  for (i = 0; i < paths.length; i ++) {
    p.push(paths[i][0]);
  }

  p.sort();

  for (var i = 0; i < p.length; i ++) {
    var path = p[i];
    var parts = path.split('/');

    var insideStructure = structure;

    for (var j = 0; j < parts.length - 1; j ++) {
      var k = 0;

      while (k < insideStructure.children.length && insideStructure.children[k].path != parts[j]) {
        k ++;
      }

      if (k == insideStructure.children.length) {
        insideStructure.children.push({path: parts[j], children: [], attributes: []});
      }

      insideStructure = insideStructure.children[k];
    }

    if (parts[parts.length - 1].indexOf('@') != -1) {
      insideStructure.attributes.push(parts[parts.length - 1].substr(1, parts[parts.length - 1].length - 1));
    } else {
      insideStructure.children.push({path: parts[parts.length - 1], children: [], attributes: []});
    }
  }

  return structure;
}

var Utilities = {
  analyseValue: analyseValue,
  ro: ro,
  getPaths: getPaths,
  generateAllPaths: generateAllPaths,
  getStructure: getStructure
};

module.exports = Utilities;