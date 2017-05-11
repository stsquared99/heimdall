'use strict';

module.exports = {
  magnet: {
    port: 3000,
    logLevel: 'debug',
		src: [
      'zones/**/*.js',
      'zones/*.js',
			'models/*.js',
			'config.js',
      '*.config.js',
      'lib/*.js',
    ],
    ignore: ['build/**', 'node_modules/**', 'static/**', 'test/**'],
  },
};
