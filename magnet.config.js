'use strict';

module.exports = {
  magnet: {
    port: 3000,
    logLevel: 'debug',
		src: [
      'zones/**/*.js',
			'models/*.js',
			'config.js',
      '*.config.js',
    ],
    ignore: ['build/**', 'node_modules/**', 'static/**', 'test/**'],
  },
};
