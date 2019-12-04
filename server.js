const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');// install package step1

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//middleware

//custom middleware

function logger (req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();//allows to request to continue to the next middleware or route handler
};

//custom that can write gatekeeper middleware that reads a password from the headers and if the password is mellon, let it continue. If not send back status code 401 and a message. Use it for /area51 only.

function gateKeeper (req, res, next) {
  console.log('password needed');
  next();
};

server.use(gateKeeper);

function auth(req, res, next) {
  if (req.url === '/area51'){
    next();
  } else {
    res.send('wrong password')
  }
}






server.use(helmet());//use package step2 <-this is global and applies to everything
server.use(express.json());//build-in middleware
server.use(logger);



//endpoints

server.use('/api/hubs', hubsRouter);

server.get('/echo', (req, res) => {
  res.send(req.headers);
})

//helmet being used below is using helmet locally
server.get('/area51', auth, (req, res) => {
  res.send('hello');
})


server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
