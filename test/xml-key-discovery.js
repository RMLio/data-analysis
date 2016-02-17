/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 2/17/16.
 */

var assert = require('chai').assert,
  discovery = require('../index'),
  XMLKeyDiscovery = discovery.XMLKeyDiscovery;

describe('XMLKeyDiscovery', function () {
  describe('basic test', function () {
    it('execute', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bookstore>' +
        '<book category="COOKING" haha="h">' +
        '<title lang="en">Everyday Italian</title>' +
        '<id>0</id>' +
        '<test>fdfd</test>' +
        '<author>Giada De Laurentiis</author>' +
        '<year>2005</year>' +
        '<price>30.00</price>' +
        '</book>' +
        '<book category="COOKING2">' +
        '<title lang="en">Everyday Italian2</title>' +
        '<id>1</id>' +
        '<author>Giada</author>' +
        '<year>2025</year>' +
        '<price>31.00</price>' +
        '</book>' +
        '<book category="CHILDREN">' +
        '<title lang="en">Harry Potter</title>' +
        '<id>2</id>' +
        '<author>J K. Rowling</author>' +
        '<year>2005</year>' +
        '<price>29.99</price>' +
        '</book>' +
        '<book category="WEB">' +
        '<title lang="en">XQuery Kick Start</title>' +
        '<id>3</id>' +
        '<author>James McGovern</author>' +
        '<author>Per Bothner</author>' +
        '<author>Kurt Cagle</author>' +
        '<author>James Linn</author>' +
        '<author>Vaidyanathan Nagarajan</author>' +
        '<year>2003</year>' +
        '<price>49.99</price>' +
        '</book>' +
        '<book category="WEB">' +
        '<title lang="en">Learning XML</title>' +
        '<id>4</id>' +
        '<author>Erik T. Ray</author>' +
        '<year>2003</year>' +
        '<price>39.95</price>' +
        '</book>' +
        '</bookstore>';

      var nodePath = "/bookstore/book";

      var discovery = new XMLKeyDiscovery(xml);
      var result = discovery.discover(nodePath);
      var expectedResult = [['title'],
        ['id'],
        ['price'],
        ['@category', 'title'],
        ['@category', 'id'],
        ['@category', 'price'],
        ['year', 'title'],
        ['year', 'id'],
        ['year', 'price'],
        ['year', '@category', 'title'],
        ['year', '@category', 'id'],
        ['year', '@category', 'price']];

      assert.deepEqual(result, expectedResult, "correct number of keys not found");
    });
  });
});