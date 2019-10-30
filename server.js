const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const morgan = require("morgan");
const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function dateLogger(req, res, next) {
  console.log(new Date().toISOString());
  next();
}

function customLogger(req, res, next) {
  const httpLoc = req.url;
  const method = req.method;
  console.log(`${method}${httpLoc}`);
  next();
}

function gateKeeper(req, res, next) {
  const password = req.headers.password;
  if (!password) {
    res.status(400).json({ message: "provide a password" });
  } else if (password.toLowerCase() === "mellon") {
    next();
  } else {
    res.status(400).json({ message: "cannot pass !" });
  }
}

// global middleware
server.use(gateKeeper);
server.use(helmet());
server.use(express.json());
server.use(dateLogger);
server.use(customLogger);
server.use(morgan("dev"));

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
