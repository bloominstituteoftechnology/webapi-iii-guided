const express = require("express"); // importing a CommonJS module

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

server.use(express.json());
server.use(logger);
server.use(atGate);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}} ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}]`
  );
  next();
}
function atGate(req, res, next) {
  console.log(`At the gate, about to be eaten`);

  next();
}

function auth(req, res, next) {
  if (req.url === "/mellon") {
    next();
  } else {
    res.send("You shall not pass!");
  }
}

module.exports = server;
