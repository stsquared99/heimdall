'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var route = exports.route = {
  method: 'get',
  path: '/',
  type: 'html'
};

exports.default = function () {
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Magnet</title>\n</head>\n<body>\n  <h1>It works!</h1>\n  <a href="/api">http://localhost:3000/api</a>\n</body>\n</html>';
};