const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const logger = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//GLOBAL MIDDLEWARE

//built in middleware
server.use(express.json());

//third party middleware
server.use(helmet());
server.use(logger('dev'));

// custom middleware
server.use(typeLogger);
server.use(addName);
// server.use(moodyGatekeeper);
// server.use(lockout);

//router
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

//custom middleware

function typeLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
};

function addName(req, res, next){
req.name=req.name || "Kristea";
next();
}

function lockout(req, res, next) {
  res.status(403).json({message: 'API lockout'});
}

function moodyGatekeeper(req, res, next) {
//keeps you out 1/3 of the time
//when it decides to keep you out is sends back status 403 message: "you shall not pass"
const seconds = new Date().getSeconds();

if (seconds % 3 === 0) {
  res.status(403).json({message: "YOU SHALL NOT PASS"});
} else {
  next();
  }
}


//error handling middleware Global error handler always at the end
//catch all error handler
server.use((err, req, res, next) => {
  // only executes if next(err) is called with an argument
  res.status(500).json({ message: "Bad Panda",
    err
  });
});

module.exports = server;
