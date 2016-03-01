/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var assert = require('chai').assert,
  discovery = require('../index'),
  XMLKeyDiscovery = discovery.XMLKeyDiscovery;

describe('XMLKeyDiscovery', function () {
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
    var expectedResult = [['title'],
      ['id'],
      ['author'],
      ['id', 'title'],
      ['author', 'title'],
      ['author', 'id'],
      ['author', 'id', 'title']];

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
      ['author', 'title'],
      ['@id', 'title'],
      ['@id', 'author'],
      ['@id', 'author', 'title']];

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
      ['author', 'title'],
      ['@id', 'title'],
      ['@id', 'author'],
      ['@id', 'author', 'title']];

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
    var result = discovery.discover(nodePath, {logLevel: 'error'});
    var expectedResult = [['title'],
      ['author', 'title']];

    //console.log(result);

    assert.deepEqual(result, expectedResult, "correct keys not found");
  });

  it.skip('#12', function () {
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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error', multiLevel: false});
    var expectedResult = [['title'],
      ['author'],
      ['author', 'title']];
    //console.log(result);

    assert.deepEqual(result, expectedResult, "correct keys not found");
  });

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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error', multiLevel: true});
    var expectedResult = [['title'],
      ['author'],
      ['details/id'],
      ['author', 'title'],
      ['details/id', 'title'],
      ['details/id', 'author'],
      ['details/id', 'author', 'title']];
    //console.log(result);

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

    var discovery = new XMLKeyDiscovery(xml);
    var result = discovery.discover(nodePath, {logLevel: 'error', multiLevel: true});
    var expectedResult = [['title'],
      ['details/id'],
      ['details/id', 'title'],
      ['author', 'title'],
      ['author', 'details/id'],
      ['author', 'details/id', 'title']];

    //console.log(result);

    assert.deepEqual(result, expectedResult, "correct keys not found");
  });
});