/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 3/3/16.
 */

var validator = require('validator');

function analyseValue(analysis, path, value) {
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

var Utilities = {
  analyseValue: analyseValue
};

module.exports = Utilities;