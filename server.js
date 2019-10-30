const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// The three amigos
function logStuff(req, res, next) {
	console.log(new Date().toISOString(), req.method, req.path);

	next(); // don't forget to call next or the request will time out.
}

function gateKeeper(req, res, next) {
	// data can come in the body, url parameters, query string, headers
	//new way of reading data sent by the client
	const password = req.headers.password || '';

	if (password.toLowerCase() === '') {
		res.status(400).json({ message: 'please enter a password' });
	} else if (password.toLowerCase() === 'mellon') {
		next();
	} else {
		res.status(401).json({ you: 'Shall Not Pass' });
	}
}

// global middleware
server.use(helmet()); // third party middleware
server.use(express.json()); // built-in middleware
server.use(gateKeeper);
// custom middleware
server.use(logStuff);
server.use(morgan('dev'));

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
	const nameInsert = req.name ? ` ${req.name}` : '';

	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
