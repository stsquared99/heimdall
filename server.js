'use strict'

/**
 * Module Dependencies
 */
const 	config        = require('./config'),
		bunyan        = require('bunyan'),
		mongoose      = require('mongoose'),
		restify       = require('restify')

/**
 * Logging
 */
global.log = bunyan.createLogger({name: config.name});


/**
 * Initialize Server
 */
global.server = restify.createServer({
		name    : config.name,
		version : config.version,
})

/**
 * Middleware
 */
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())

/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
		log.error(err.stack)
		res.send(err)
});

/**
 * Lift Server, Connect to DB & Bind Routes
 */
server.listen(config.port, function() {

		mongoose.connection.on('error', function(err) {
				log.error('Mongoose default connection error: ' + err)
				process.exit(1)
		})

		mongoose.connection.on('open', function(err) {

				if (err) {
						log.error('Mongoose default connection error: ' + err)
						process.exit(1)
				}

				log.info(
						'%s v%s ready to accept connections on port %s in %s environment.',
						server.name,
						config.version,
						config.port,
						config.env
				)

				require('./routes')

		})

		global.db = mongoose.connect(config.db.uri)
})
