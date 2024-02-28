var webhook = require("webex-node-bot-framework/webhook");
var config = require("./config/config")

const mongodb = require("./database/db");
mongodb.connect(process.env.MONGODB);

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(express.static("images"));

var framework = require("./framework/framework")

require("./controller/basicControllers")(framework)
require("./controller/reviewControllers")(framework)

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
