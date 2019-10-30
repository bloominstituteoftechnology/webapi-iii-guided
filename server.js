const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// three amigos
function dateLogger(req, res, next) {
  console.log(new Date().toISOString())
  next()
}
server.use('/', function (req, res, next) {
  console.log(res, req.originalUrl)
  next()
})

//global middleware
server.use(helmet()); //third party
server.use(express.json()); // built in
server.use(dateLogger) // custom middleware
server.use('/api/hubs', hubsRouter);


server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
