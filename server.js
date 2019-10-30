const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // importing helmet security module
const hubsRouter = require('./hubs/hubs-router.js');
const morgan =require('morgan')

const server = express();
function datelogger(req, res, next){
  console.log(new Date().toISOString());
  next();
  
  }
  function actionLogger(req, res, next){
    console.log(req)
    next();
  
  }
    

server.use(helmet)
server.use(express.json());
server.use('/api/hubs', hubsRouter);
server.use(datelogger());
server.use(actionLogger());
ServiceUIFrameContext.use('morgan(dev')
server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
