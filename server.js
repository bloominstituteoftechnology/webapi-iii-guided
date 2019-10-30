const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const hubsRouter = require('./hubs/hubs-router.js');
const morgan = require('morgan') // a way to capture useful information (the time is tooks to run and which request)

const server = express();

// three amigos
// function dateLogger(req, res, next) {
//   console.log(new Date().toISOString())
//   next()
// }

function logger(req, res, next) {
  console.log(`The Logger [${new Date().toISOString()}] ${req.method} to ${req.url}`)

  next()
}

function gateKeeper(req, res, next) {
  // data can come in the body, url parameters. query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password

  if(!password) {
    res.status(400).json({ you: 'please provide a password'})
  } if(password.toLowerCase() === 'melon') {
    next()
  } else {
    res.status(401).json({ you: 'cannot pass'})
  }
  
}
// server.use('/', function (req, res, next) {
//   console.log(res, req.originalUrl)
//   next()
// })

//global middleware
server.use(helmet()); //third party
server.use(express.json()); // built in
server.use(gateKeeper)
// server.use(dateLogger) // custom middleware
server.use('/api/hubs', hubsRouter);
server.use(logger)
server.use(morgan('dev'))


server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
