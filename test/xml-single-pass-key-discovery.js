/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var assert = require('chai').assert,
  discovery = require('../index'),
  XMLKeyDiscovery = discovery.XMLSinglePassKeyDiscovery;

describe('XMLSinglePassKeyDiscovery', function () {
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error'});
    var expectedResult = [['title'],
      ['author'],
    ['author', 'title']];

    console.log(result);

    assert.deepEqual(result, expectedResult, "correct keys not found");
  });

  //it('#9', function () {
  //  var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
  //    '<bookstore>' +
  //    '<book>' +
  //    '<title>Everyday Italian</title>' +
  //    '<author>James McGovern</author>' +
  //    '<author>James Peterson</author>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>Everyday Italian2</title>' +
  //    '<author>Pieter McGovern</author>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>Harry Potter</title>' +
  //    '<author>J K. Rowling</author>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>XQuery Kick Start</title>' +
  //    '<author>James McGovern</author>' +
  //    '<author>James Peterson</author>' +
  //    '</book>' +
  //    '</bookstore>';
  //
  //  var nodePath = "/bookstore/book";
  //
  //  var discovery = new XMLKeyDiscovery(xml);
  //  var result = discovery.discover(nodePath, {logLevel: 'error'});
  //  var expectedResult = [['title'],
  //    ['author', 'title']];
  //
  //  //console.log(result);
  //
  //  assert.deepEqual(result, expectedResult, "correct keys not found");
  //});
  //
  //it('#10', function () {
  //  var xml = '<?xml version="1.0"?> <?xml-stylesheet type="text/css" href="nutrition.css"?><nutrition><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving units="g">29</serving><calories total="110" fat="100"/> <total-fat>11</total-fat> <saturated-fat>3</saturated-fat> <cholesterol>5</cholesterol> <sodium>210</sodium> <carb>2</carb> <fiber>0</fiber> <protein>1</protein></food> <food> <name>Bagels, New York Style </name> <mfr>Thompson</mfr> <serving units="g">104</serving> <calories total="300" fat="35"/> <total-fat>4</total-fat> <saturated-fat>1</saturated-fat> <cholesterol>0</cholesterol> <sodium>510</sodium> <carb>54</carb> <fiber>3</fiber> <protein>11</protein></food> </nutrition>';
  //  xml = xml.replace(/(\r\n|\n|\r)/gm, "");
  //  xml = xml.replace(/> *</g, "><");
  //
  //  var nodePath = "/nutrition/food";
  //
  //  var discovery = new XMLKeyDiscovery(xml);
  //  var result = discovery.discover(nodePath, {logLevel: 'error', multiLevel: false});
  //  var expectedResult = [['name'],
  //    ['mfr'],
  //    ['serving'],
  //    ['total-fat'],
  //    ['saturated-fat'],
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
  //it('#11', function () {
  //  var xml = '<?xml version="1.0"?> <?xml-stylesheet type="text/css" href="nutrition.css"?><nutrition><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving units="g">29</serving><calories total="110" fat="100">50</calories><total-fat>11</total-fat> <saturated-fat>3</saturated-fat> <cholesterol>5</cholesterol> <sodium>210</sodium> <carb>2</carb> <fiber>0</fiber> <protein>1</protein></food> <food> <name>Bagels, New York Style </name> <mfr>Thompson</mfr> <serving units="g">104</serving> <calories total="300" fat="35"/> <total-fat>4</total-fat> <saturated-fat>1</saturated-fat> <cholesterol>0</cholesterol> <sodium>510</sodium> <carb>54</carb> <fiber>3</fiber> <protein>11</protein></food> </nutrition>';
  //  xml = xml.replace(/(\r\n|\n|\r)/gm, "");
  //  xml = xml.replace(/> *</g, "><");
  //
  //  var nodePath = "/nutrition/food";
  //
  //  var discovery = new XMLKeyDiscovery(xml);
  //  var result = discovery.discover(nodePath, {logLevel: 'error',multiLevel: false});
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
  //  var discovery = new XMLKeyDiscovery(xml);
  //  var result = discovery.discover(nodePath, {logLevel: 'error',multiLevel: true});
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
  //it('#13', function () {
  //  var xml = '  <?xml version="1.0" encoding="UTF-8"?>' +
  //    '<bookstore>' +
  //    '<book>' +
  //    '<title>Everyday Italian</title>' +
  //    '<author>James McGovern</author>' +
  //    '<author>James Peterson</author>' +
  //    '<details>' +
  //    '<id>0</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>Everyday Italian2</title>' +
  //    '<author>Pieter McGovern</author>' +
  //    '<details>' +
  //    '<id>1</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>Harry Potter</title>' +
  //    '<author>J K. Rowling</author>' +
  //    '<details>' +
  //    '<id>2</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>XQuery Kick Start</title>' +
  //    '<author>James McGovern</author>' +
  //    '<details>' +
  //    '<id>3</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '</bookstore>';
  //
  //  xml = xml.replace(/(\r\n|\n|\r)/gm, "");
  //  xml = xml.replace(/> *</g, "><");
  //
  //  var nodePath = "/bookstore/book";
  //
  //  var discovery = new XMLKeyDiscovery(xml);
  //  var result = discovery.discover(nodePath, {logLevel: 'error',multiLevel: true});
  //  var expectedResult = [['title'], ['author'], ['details/id']];
  //
  //  //console.log(result);
  //
  //  assert.deepEqual(result, expectedResult, "correct keys not found");
  //});
  //
  //it('#14', function () {
  //  var xml = '  <?xml version="1.0" encoding="UTF-8"?>' +
  //    '<bookstore>' +
  //    '<book>' +
  //    '<title>Everyday Italian</title>' +
  //    '<author>James McGovern</author>' +
  //    '<details>' +
  //    '<id>0</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>Everyday Italian2</title>' +
  //    '<author>Pieter McGovern</author>' +
  //    '<details>' +
  //    '<id>1</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>Harry Potter</title>' +
  //    '<author>J K. Rowling</author>' +
  //    '<details>' +
  //    '<id>2</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '<book>' +
  //    '<title>XQuery Kick Start</title>' +
  //    '<author>James McGovern</author>' +
  //    '<details>' +
  //    '<id>3</id>' +
  //    '</details>' +
  //    '</book>' +
  //    '</bookstore>';
  //
  //  xml = xml.replace(/(\r\n|\n|\r)/gm, "");
  //  xml = xml.replace(/> *</g, "><");
  //
  //  var nodePath = "/bookstore/book";
  //
  //  var discovery = new XMLKeyDiscovery(xml);
  //  var result = discovery.discover(nodePath, {logLevel: 'error', multiLevel: true});
  //  var expectedResult = [['title'],
  //    ['details/id'],
  //    ['author', 'title'],
  //    ['author', 'details/id']];
  //
  //
  //  //console.log(result);
  //
  //  assert.deepEqual(result, expectedResult, "correct keys not found");
  //});
});