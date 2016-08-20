'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
	connections: {
		routes: {
			cors: true
		}
	}
});
server.connection({
	host: process.env.IP || "0.0.0.0",
	port: process.env.PORT || 3000
});

require("./route.js")(server);

// Start the server
server.start(function(err){
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri);
});