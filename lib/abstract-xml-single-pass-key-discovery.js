/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var winston = require('winston');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;
var utilities = require('./utilities');

function AbstractXMLSinglePassKeyDiscovery(xml) {
  if (xml) {
    this.doc = new dom().parseFromString(xml);
    this.startMemUsage = process.memoryUsage();
  }

  this.multiLevel = true;
  this.extendedOutput = false;
  this.content = [];
  this.pathWithAllKeysValid = true;
  this.analysis = {};
}

AbstractXMLSinglePassKeyDiscovery.prototype.discover = function (nodePath, config) {
  if (config) {
    if (config.logLevel) {
      winston.level = config.logLevel;
    }

    if (config.multiLevel != undefined) {
      this.multiLevel = config.multiLevel;
    }

    this.extendedOutput = config.extendedOutput;
  }

  var nodes = xpath.select(nodePath, this.doc);
  this.startTime = new Date().getTime();

  var p_c = [];

  if (nodes.length == 0) {
    winston.warn('no nodes were found using \'' + nodePath + '\'');
  } else {
    winston.info("looking for paths ...");
    var p_a = utilities.getPaths(nodes, this.multiLevel);
    var singleKeyPathsCount = p_a.length;
    var structure = utilities.getStructure(p_a);
    //console.log(structure);

    winston.debug(p_a);

    var validIndexes = [];
    var indexCounter = 0;

    for (var i = 0; i < p_a.length; i++) {
      p_c.push({paths: p_a[i], valid: true});
      validIndexes.push(indexCounter);
      indexCounter++;
    }

    for (var i = 0; i < p_a.length; i++) {
      var temp = utilities.ro(p_a[i], p_a);

      for (var j = 0; j < temp.length; j++) {
        p_c.push({paths: temp[j], buildOn: i, valid: true})
        validIndexes.push(indexCounter);
        indexCounter++;
      }

      p_a = p_a.concat(temp);
    }

    winston.debug(p_a);

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      for (var j = 0; j < validIndexes.length; j++) {
        var p = p_c[validIndexes[j]];

        if (!(p.buildOn && p_c[p.buildOn].valid) || p.paths.length == singleKeyPathsCount) {
          var paths = p.paths;
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
                    utilities.analyseValue(this.analysis, path, temp);
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
            var tree = this.content[path];

            var foundNodes = this.processTree(tree, i, value, path);

            foundNodesGroup.push(foundNodes);

          }

          if (singleKeyPathsCount == p.paths.length) {
            if (this.pathWithAllKeysValid && p_c[p.buildOn].valid && this.atLeastOneNodeInAllGroups(foundNodesGroup, i)) {
              pathWithAllKeysValid = false;
            }
          } else if (this.atLeastOneNodeInAllGroups(foundNodesGroup, i)) {
            winston.debug('removed ' + p.paths);
            p_c[validIndexes[j]].valid = false;
            validIndexes.splice(j, 1);
            j--;
          }

          //winston.silly('done ' + i);
        }
      }
    }

    if (!this.pathWithAllKeysValid) {
      p_c[p_c.length - 1].valid = false;
    }
  }

  p_a = [];

  for (var i = 0; i < p_c.length; i++) {
    if (p_c[i].valid) {
      p_a.push(p_c[i].paths);
    }
  }

  if (this.extendedOutput) {
    return {
      keys: p_a,
      nodeCount: nodes.length,
      analysis: this.analysis,
      structure: structure,
      startTime: this.startTime,
      startMemUsage: this.startMemUsage
    }
  } else {
    return p_a;
  }
};

AbstractXMLSinglePassKeyDiscovery.prototype.atLeastOneNodeInAllGroups = function (groups, index) {
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

module.exports = {
  AbstractXMLSinglePassKeyDiscovery: AbstractXMLSinglePassKeyDiscovery
};