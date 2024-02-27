var framework = require("webex-node-bot-framework");
var webhook = require("webex-node-bot-framework/webhook");
require("dotenv").config();

const mongodb = require("./database/db");
mongodb.connect(process.env.MONGODB);

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(express.static("images"));

const config = {
  webhookUrl: process.env.WEBHOOKURL,
  token: process.env.BOTTOKEN,
  port: process.env.PORT,
};

// init framework
var framework = new framework(config);
framework.start();
console.log("Starting framework, please wait...");

require("./controller/basicControllers")(framework)
require("./controller/reviewControllers")(framework)

//Server config & housekeeping
// Health Check
app.get("/", (req, res) => {
  res.send(`I'm alive.`);
});

app.post("/", webhook(framework));

var server = app.listen(config.port, () => {
  framework.debug("framework listening on port %s", config.port);
});

// gracefully shutdown (ctrl-c)
process.on("SIGINT", () => {
  framework.debug("stopping...");
  server.close();
  framework.stop().then(() => {
    process.exit();
  });
});
