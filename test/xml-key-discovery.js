/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var assert = require('chai').assert,
  discovery = require('../index'),
  XMLKeyDiscovery = discovery.XMLKeyDiscovery;

describe('XMLKeyDiscovery - Single Level', function () {
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
    var result = discovery.discover(nodePath);
    var expectedResult = [['title'],
      ['id'],
      ['author']];

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
    var result = discovery.discover(nodePath);
    var expectedResult = [['@id'], ['title'],
      ['author']];

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
    var result = discovery.discover(nodePath);
    var expectedResult = [['title'], ['author'],
      ['@id', 'title'], ['@id', 'author']];

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
    var result = discovery.discover(nodePath);
    var expectedResult = [['@id'], ['title'],
      ['author']];

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
    var result = discovery.discover(nodePath);
    var expectedResult = [['title'],
      ['author'],
      ['@id', 'title'],
      ['@id', 'author']];

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
    var result = discovery.discover(nodePath);
    var expectedResult = [['title'],
      ['author']];

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
    var result = discovery.discover(nodePath);
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
    var result = discovery.discover(nodePath);
    var expectedResult = [['title'],
      ['author']];

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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath);
    var expectedResult = [['title'],
      ['author', 'title']];

    //console.log(result);

    assert.deepEqual(result, expectedResult, "correct keys not found");
  });

  it('#10', function () {
    var xml = '?xml version="1.0"?> <?xml-stylesheet type="text/css" href="nutrition.css"?><nutrition><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving units="g">29</serving><calories total="110" fat="100"/> <total-fat>11</total-fat> <saturated-fat>3</saturated-fat> <cholesterol>5</cholesterol> <sodium>210</sodium> <carb>2</carb> <fiber>0</fiber> <protein>1</protein></food> <food> <name>Bagels, New York Style </name> <mfr>Thompson</mfr> <serving units="g">104</serving> <calories total="300" fat="35"/> <total-fat>4</total-fat> <saturated-fat>1</saturated-fat> <cholesterol>0</cholesterol> <sodium>510</sodium> <carb>54</carb> <fiber>3</fiber> <protein>11</protein></food> </nutrition>';
    xml = xml.replace(/(\r\n|\n|\r)/gm, "");
    xml = xml.replace(/> *</g, "><");

    var nodePath = "/nutrition/food";

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath);
    var expectedResult = [['saturated-fat'],
        ['name'],
        ['serving'],
        ['fiber'],
        ['total-fat'],
        ['mfr'],
        ['cholesterol'],
        ['sodium'],
        ['carb'],
        ['protein'],
        ['calories', 'saturated-fat'],
        ['calories', 'name'],
        ['calories', 'serving'],
        ['calories', 'fiber'],
        ['calories', 'total-fat'],
        ['calories', 'mfr'],
        ['calories', 'cholesterol'],
        ['calories', 'sodium'],
        ['calories', 'carb'],
        ['calories', 'protein']]
      ;

    //console.log(result);

    assert.deepEqual(result, expectedResult, "correct keys not found");
  });

  it('#11', function () {
    var xml = '?xml version="1.0"?> <?xml-stylesheet type="text/css" href="nutrition.css"?><nutrition><food><name>Avocado Dip</name><mfr>Sunnydale</mfr><serving units="g">29</serving><calories total="110" fat="100">50</calories><total-fat>11</total-fat> <saturated-fat>3</saturated-fat> <cholesterol>5</cholesterol> <sodium>210</sodium> <carb>2</carb> <fiber>0</fiber> <protein>1</protein></food> <food> <name>Bagels, New York Style </name> <mfr>Thompson</mfr> <serving units="g">104</serving> <calories total="300" fat="35"/> <total-fat>4</total-fat> <saturated-fat>1</saturated-fat> <cholesterol>0</cholesterol> <sodium>510</sodium> <carb>54</carb> <fiber>3</fiber> <protein>11</protein></food> </nutrition>';
    xml = xml.replace(/(\r\n|\n|\r)/gm, "");
    xml = xml.replace(/> *</g, "><");

    var nodePath = "/nutrition/food";

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath);
    var expectedResult = [['saturated-fat'],
      ['name'],
      ['serving'],
      ['calories'],
      ['total-fat'],
      ['mfr'],
      ['cholesterol'],
      ['sodium'],
      ['carb'],
      ['fiber'],
      ['protein']];


    //console.log(result);

    assert.deepEqual(result, expectedResult, "correct keys not found");
  });
});