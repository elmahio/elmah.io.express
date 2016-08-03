# elmah.io.express

[![npm version](https://badge.fury.io/js/elmah.io.svg)](https://badge.fury.io/js/elmah.io)

npm package for sending errors from express to elmah.io.

## Installation

Install the module:

`npm install elmah.io`

## Configuration

```javascript
var elmah = require("elmah.io");
var express = require("express");

var app = express();
app.use(elmah.auto({logId:"LOG_ID", application:"My App Name", version: "42.0.0"}));
```

(replace `LOG_ID` with your log ID)
