# Data Analysis for Hierarchical Data

This is a Node.js module for the analysis of hierarchical data. It provides the data model, keys and data types of the given dataset. Currently, only XML is supported.

## Requirements
- Node.js installed

## Usage
```
//select the wanted algorithm: Daro or SDaro
var dataAnalysis = require('data-analysis').SDaro;

//example XML string
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

//example path to nodes that we want to analyze
var nodePath = "/bookstore/book";

//create new data analysis object, using the XML string
var da = new dataAnalysis(xml);
//perform analysis, given the nodepath
var result = da.analyze(nodePath);
```

The function analyze has a second, optional parameter `config`, which expects a `json` object with the fields:
- logLevel: set the log level of the analysis (silly, info, warn, debug, error).
- multiLevel: if true, the analysis will be performed on all levels of the hierarchical data, not only on the first level
- features: 'structure' only the data model, 'keys' the keys and data model, 'datatypes' the data types and data model, 'all' (default) returns data model, keys and data types.
- pruning: (only applicable for Daro) if true, pruning during key discovery is enabled

## Remarks
Currently, the module is not yet available via `npm`. However, you can manually add it to the `package.json` of your Node.js application.

## License

The software is available under the terms of the [MIT license](https://opensource.org/licenses/mit-license.html).
