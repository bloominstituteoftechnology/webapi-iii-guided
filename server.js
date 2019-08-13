const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const logger = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
// express.json is a method that returns a piece of middleware
const bodyParser = express.json();

// GLOBAL

// built in middleware
server.use(bodyParser);

// third party middleware
server.use(helmet());
server.use(logger('dev'));
// server.use(methodLogger);
// server.use(gandalf);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

// Custom Middleware
function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
}

function addName(req, res, next) {
  req.name = 'Cassandra';
  next();
}

function lockout(req, res, next) {
  res.status(403).json({ message: 'API lockout' });
}

// YOU DO
// a piece of global middleware that blocks the API and sends "You shall not pass" message
// when the seconds on the clock are a multiple of 3
// function gandalf(req, res, next) {
//   const time = new Date().getSeconds;
//   if (time % 3 === 0) {
//     res.status(403).json({ message: 'YOU SHALL NOT PASS!' });
//   } else {
//     next();
//   }
// }

server.use((error, req, res, next) => {
  res.status(400).json({ message: 'Bad Panda!', error });
});

module.exports = server;
