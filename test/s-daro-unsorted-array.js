/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var assert = require('chai').assert,
  expect = require('chai').expect,
  dataAnalysis = require('../index').SDaro;

describe('SDaro with Unsorted Array', function () {
  describe('keys', function () {
    it('#1', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult =
        [['title'],
          ['id'],
          ['author'],
          ['id', 'title'],
          ['author', 'title'],
          ['author', 'id'],
          ['author', 'id', 'title']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#2', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book id="0">' +
        '<title>Everyday Italian</title>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book id="1">' +
        '<title>Everyday Italian2</title>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book id="2">' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book id="3">' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['@id'],
        ['title'],
        ['author'],
        ['title', '@id'],
        ['author', '@id'],
        ['author', 'title'],
        ['author', 'title', '@id']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#3', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book id="0">' +
        '<title>Everyday Italian</title>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book id="1">' +
        '<title>Everyday Italian2</title>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book id="1">' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book id="3">' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['title'],
        ['author'],
        ['title', '@id'],
        ['author', '@id'],
        ['author', 'title'],
        ['author', 'title', '@id']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#4', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book id="0">' +
        '<title>Everyday Italian</title>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book id="1">' +
        '<title>Everyday Italian2</title>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book id="3">' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['@id'],
        ['title'],
        ['author'],
        ['title', '@id'],
        ['author', '@id'],
        ['author', 'title'],
        ['author', 'title', '@id']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#5', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book id="0">' +
        '<title>Everyday Italian</title>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book id="1">' +
        '<title>Everyday Italian2</title>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['title'],
        ['author'],
        ['title', '@id'],
        ['author', '@id'],
        ['author', 'title'],
        ['author', 'title', '@id']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#6', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['title'],
        ['author'],
        ['author', 'title']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#7', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['title'],
        ['author', 'title']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#8', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<author>James McGovern</author>' +
        '<author>James Peterson</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<author>Pieter McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['title'],
        ['author'],
        ['author', 'title']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#9', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<author>James McGovern</author>' +
        '<author>James Peterson</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<author>Pieter McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '<author>James Peterson</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error'});
      var expectedResult = [['title'],
        ['author', 'title']];

      //console.log(result);

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    //it('#10', function () {
    //  var xml = '<?xml version="1.0"?> <?xml-stylesheet type="text/css" href="nutrition.css"?><nutrition><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving units="g">29</serving><calories total="110" fat="100"/> <total-fat>11</total-fat> <saturated-fat>3</saturated-fat> <cholesterol>5</cholesterol> <sodium>210</sodium> <carb>2</carb> <fiber>0</fiber> <protein>1</protein></food> <food> <name>Bagels, New York Style </name> <mfr>Thompson</mfr> <serving units="g">104</serving> <calories total="300" fat="35"/> <total-fat>4</total-fat> <saturated-fat>1</saturated-fat> <cholesterol>0</cholesterol> <sodium>510</sodium> <carb>54</carb> <fiber>3</fiber> <protein>11</protein></food> </nutrition>';
    //  xml = xml.replace(/(\r\n|\n|\r)/gm, "");
    //  xml = xml.replace(/> *</g, "><");
    //
    //  var nodePath = "/nutrition/food";
    //
    //  var da = new dataAnalysis(xml);
    //  var result = da.analyze(nodePath, {logLevel: 'error', multiLevel: false});
    //  var expectedResult;
    //
    //
    //  //console.log(result);
    //
    //  //assert.deepEqual(result, expectedResult, "correct keys not found");
    //  assert.equal(result.length, expectedResult.length, "correct keys not found");
    //});

    //it('#11', function () {
    //  var xml = '<?xml version="1.0"?> <?xml-stylesheet type="text/css" href="nutrition.css"?><nutrition><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving units="g">29</serving><calories total="110" fat="100">50</calories><total-fat>11</total-fat> <saturated-fat>3</saturated-fat> <cholesterol>5</cholesterol> <sodium>210</sodium> <carb>2</carb> <fiber>0</fiber> <protein>1</protein></food> <food> <name>Bagels, New York Style </name> <mfr>Thompson</mfr> <serving units="g">104</serving> <calories total="300" fat="35"/> <total-fat>4</total-fat> <saturated-fat>1</saturated-fat> <cholesterol>0</cholesterol> <sodium>510</sodium> <carb>54</carb> <fiber>3</fiber> <protein>11</protein></food> </nutrition>';
    //  xml = xml.replace(/(\r\n|\n|\r)/gm, "");
    //  xml = xml.replace(/> *</g, "><");
    //
    //  var nodePath = "/nutrition/food";
    //
    //  var da = new dataAnalysis(xml);
    //  var result = da.analyze(nodePath, {logLevel: 'error',multiLevel: false});
    //  var expectedResult = [['saturated-fat'],
    //    ['name'],
    //    ['serving'],
    //    ['calories'],
    //    ['total-fat'],
    //    ['mfr'],
    //    ['cholesterol'],
    //    ['sodium'],
    //    ['carb'],
    //    ['fiber'],
    //    ['protein']];
    //
    //  //console.log(result);
    //
    //  assert.deepEqual(result, expectedResult, "correct keys not found");
    //});
    //
    //it('#12', function () {
    //  var xml = '<?xml version="1.0"?> <?xml-stylesheet type="text/css" href="nutrition.css"?><nutrition><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving units="g">29</serving><calories total="110" fat="100">50</calories><total-fat>11</total-fat> <saturated-fat>3</saturated-fat> <cholesterol>5</cholesterol> <sodium>210</sodium> <carb>2</carb> <fiber>0</fiber> <protein>1</protein></food> <food> <name>Bagels, New York Style </name> <mfr>Thompson</mfr> <serving units="g">104</serving> <calories total="300" fat="35"/> <total-fat>4</total-fat> <saturated-fat>1</saturated-fat> <cholesterol>0</cholesterol> <sodium>510</sodium> <carb>54</carb> <fiber>3</fiber> <protein>11</protein></food> </nutrition>';
    //  xml = xml.replace(/(\r\n|\n|\r)/gm, "");
    //  xml = xml.replace(/> *</g, "><");
    //
    //  var nodePath = "/nutrition/food";
    //
    //  var da = new dataAnalysis(xml);
    //  var result = da.analyze(nodePath, {logLevel: 'error',multiLevel: true});
    //  var expectedResult = [['total-fat'],
    //    ['name'],
    //    ['fiber'],
    //    ['serving'],
    //    ['calories/@total'],
    //    ['calories/@fat'],
    //    ['calories'],
    //    ['mfr'],
    //    ['saturated-fat'],
    //    ['cholesterol'],
    //    ['sodium'],
    //    ['carb'],
    //    ['protein'],
    //    ['serving/@units', 'total-fat'],
    //    ['serving/@units', 'name'],
    //    ['serving/@units', 'fiber'],
    //    ['serving/@units', 'serving'],
    //    ['serving/@units', 'calories/@total'],
    //    ['serving/@units', 'calories/@fat'],
    //    ['serving/@units', 'calories'],
    //    ['serving/@units', 'mfr'],
    //    ['serving/@units', 'saturated-fat'],
    //    ['serving/@units', 'cholesterol'],
    //    ['serving/@units', 'sodium'],
    //    ['serving/@units', 'carb'],
    //    ['serving/@units', 'protein']];
    //
    //  //console.log(result);
    //
    //  assert.deepEqual(result, expectedResult, "correct keys not found");
    //});
    //
    it('#13', function () {
      var xml = '  <?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<author>James McGovern</author>' +
        '<author>James Peterson</author>' +
        '<details>' +
        '<id>0</id>' +
        '</details>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<author>Pieter McGovern</author>' +
        '<details>' +
        '<id>1</id>' +
        '</details>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '<details>' +
        '<id>2</id>' +
        '</details>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '<details>' +
        '<id>3</id>' +
        '</details>' +
        '</book>' +
        '</bookstore>';

      xml = xml.replace(/(\r\n|\n|\r)/gm, "");
      xml = xml.replace(/> *</g, "><");

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', multiLevel: true});
      var expectedResult = [['title'],
        ['author'],
        ['details/id'],
        ['author', 'title'],
        ['details/id', 'title'],
        ['details/id', 'author'],
        ['details/id', 'author', 'title']];

      //console.log(result);

      for (var i = 0; i < expectedResult.length; i++) {
        expectedResult[i] = expectedResult[i].sort();
      }

      expectedResult = expectedResult.sort();

      for (var i = 0; i < result.length; i++) {
        result[i] = result[i].sort();
      }

      result = result.sort();

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });

    it('#14', function () {
      var xml = '  <?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<author>James McGovern</author>' +
        '<details>' +
        '<id>0</id>' +
        '</details>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<author>Pieter McGovern</author>' +
        '<details>' +
        '<id>1</id>' +
        '</details>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<author>J K. Rowling</author>' +
        '<details>' +
        '<id>2</id>' +
        '</details>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<author>James McGovern</author>' +
        '<details>' +
        '<id>3</id>' +
        '</details>' +
        '</book>' +
        '</bookstore>';

      xml = xml.replace(/(\r\n|\n|\r)/gm, "");
      xml = xml.replace(/> *</g, "><");

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', multiLevel: true});
      var expectedResult = [['title'],
        ['details/id'],
        ['details/id', 'title'],
        ['author', 'title'],
        ['author', 'details/id'],
        ['author', 'details/id', 'title']];

      //console.log(result);

      for (var i = 0; i < expectedResult.length; i++) {
        expectedResult[i] = expectedResult[i].sort();
      }

      expectedResult = expectedResult.sort();

      for (var i = 0; i < result.length; i++) {
        result[i] = result[i].sort();
      }

      result = result.sort();

      assert.deepEqual(result, expectedResult, "correct keys not found");
    });
  });

  describe('datatypes', function () {
    it('#1', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});
      var expectedResult = {
        author: {types: {'0': 0, '1': 5, '3': 0, '4': 0, '6': 0}},
        id: {types: {'0': 0, '1': 0, '3': 0, '4': 0, '6': 5}},
        title: {types: {'0': 0, '1': 5, '3': 0, '4': 0, '6': 0}}
      };

      assert.deepEqual(result.analysis.author.types, expectedResult.author.types, "correct datatypes not found");
      assert.deepEqual(result.analysis.id.types, expectedResult.id.types, "correct datatypes not found");
      assert.deepEqual(result.analysis.title.types, expectedResult.title.types, "correct datatypes not found");
    });
  });

  describe('max, min, average', function () {
    it('#1', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});

      //console.log(result.analysis);

      assert.equal(result.analysis.author.max, undefined, "max should not be defined");
      assert.equal(result.analysis.author.min, undefined, "min should not be defined");
      assert.equal(result.analysis.author.average, undefined, "average should not be defined");
      assert.equal(result.analysis.title.max, undefined, "max should not be defined");
      assert.equal(result.analysis.title.min, undefined, "min should not be defined");
      assert.equal(result.analysis.title.average, undefined, "average should not be defined");
      assert.equal(result.analysis.id.max, 4, "max is not correct");
      assert.equal(result.analysis.id.min, 0, "min is not correct");
      assert.equal(result.analysis.id.average, 2, "average is not correct");
    });
  });

  describe('skewness, kurtosis', function () {
    it('#1', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<id>25</id>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});

      //console.log(result.analysis);

      assert.equal(result.analysis.author.kurtosis, undefined, "kurtosis should not be defined");
      assert.equal(result.analysis.author.skewness, undefined, "skewness should not be defined");
      assert.equal(result.analysis.title.kurtosis, undefined, "kurtosis should not be defined");
      assert.equal(result.analysis.title.skewness, undefined, "skewness should not be defined");
      assert.equal(result.analysis.id.kurtosis, 0.13641827999069012, "kurtosis is not correct");
      assert.equal(result.analysis.id.skewness, 1.4141377945955569, "skewness is not correct");
    });
  });

  describe('average words, characters', function () {
    it('#1', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<id>25</id>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});

      //console.log(result.analysis);

      assert.equal(result.analysis.id.averageWords, undefined, "averageWords should not be defined");
      assert.equal(result.analysis.id.averageCharacters, undefined, "averageCharacters should not be defined");
      assert.equal(result.analysis.author.averageWords, 2.4, "averageWords is not correct");
      assert.equal(result.analysis.author.averageCharacters, 5.083333333333333, "averageCharacters is not correct");
      assert.equal(result.analysis.title.averageWords,2.2, "averageWords is not correct");
      assert.equal(result.analysis.title.averageCharacters, 6.7272727272727275, "averageCharacters is not correct");
    });
  });

  describe('structure', function () {
    it('#1', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book>' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});
      var expectedResult = {
        attributes: [],
        children: [{path: 'author', children: [], attributes: []},
          {path: 'id', children: [], attributes: []},
          {path: 'title', children: [], attributes: []}]
      };

      //console.log(result.structure);

      assert.deepEqual(result.structure, expectedResult, "structure is not correct");

    });

    it('#2', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book id="9">' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});
      var expectedResult = {
        attributes: ['id'],
        children: [{path: 'author', children: [], attributes: []},
          {path: 'id', children: [], attributes: []},
          {path: 'title', children: [], attributes: []}]
      };

      //console.log(result.structure);

      assert.deepEqual(result.structure, expectedResult, "structure is not correct");

    });

    it('#3', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book id="9">' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
          '<details>' +
          'test' +
          '</details>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});
      var expectedResult = {
        attributes: ['id'],
        children: [{path: 'author', children: [], attributes: []},
          {path: 'details', children: [], attributes: []},
          {path: 'id', children: [], attributes: []},
          {path: 'title', children: [], attributes: []}]
      };

      //console.log(result.structure);

      assert.deepEqual(result.structure, expectedResult, "structure is not correct");

    });

    it('#4', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book id="9">' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '<details>' +
        '<det1>' +
        'blabla' +
        '</det1>' +
        '</details>' +
        '</book>' +
        '<book>' +
        '<title>XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '</book>' +
        '<book>' +
        '<title>Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});
      var expectedResult = {
        attributes: ['id'],
        children: [{path: 'author', children: [], attributes: []},
          {path: 'details', children: [{"attributes": [], "children": [], "path": "det1"}], attributes: []},
          {path: 'id', children: [], attributes: []},
          {path: 'title', children: [], attributes: []}]
      };

      //console.log(result.structure);

      assert.deepEqual(result.structure, expectedResult, "structure is not correct");
    });

    it('#5', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book>' +
        '<title>Everyday Italian</title>' +
        '<id>0</id>' +
        '<author>Giada De Laurentiis</author>' +
        '</book>' +
        '<book>' +
        '<title>Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '</book>' +
        '<book id="9">' +
        '<title>Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '<details>' +
        '<det1 my="t">' +
        'blabla' +
        '</det1>' +
        '</details>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var da = new dataAnalysis(xml);
      var result = da.analyze(nodePath, {logLevel: 'error', extendedOutput: true});
      var expectedResult = {
        attributes: ['id'],
        children: [{path: 'author', children: [], attributes: []},
          {path: 'details', children: [{"attributes": ['my'], "children": [], "path": "det1"}], attributes: []},
          {path: 'id', children: [], attributes: []},
          {path: 'title', children: [], attributes: []}]
      };

      //console.log(result.structure.children[1].children);

      assert.deepEqual(result.structure, expectedResult, "structure is not correct");
    });
  });
});