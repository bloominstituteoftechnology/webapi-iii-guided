const express = require('express'); // importing a CommonJS module
const helmet = require("helmet"); //<<<<<< install the package (1.)

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//middleware

//custom middleware 
function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next(); //allowso the request to continue to the next middleware or route handler
};

server.use(helmet()); //<<<< use it (2.)
server.use(express.json()); //built-in middleware
server.use(logger);

//write a gatekeeper middleware that reads a password from th headers and if the password is 'mellon', let it continue
//if not, send back status code 401 and a message
function passwordCheck(req, res, next) {
  if (req.password === "mellon") {
    next();
  } else {
    res.status(401).json({ message: "password is incorrect" })
  }
};

//endpoints
server.use('/api/hubs', hubsRouter); //also local middleware, because it only applies to /api/hubs

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});
//shift + al + up or down to copy the selected lines
server.get('/echo', (req, res) => {
  res.send(req.headers);
});

server.get('/area51', helmet(), (req, res) => {
  res.send(req.headers);
});

module.exports = server;
