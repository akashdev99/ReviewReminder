import  webhook from "webex-node-bot-framework/webhook.js";
import config from "./config/config.js";
import mongo from "./database/mongo.js"


import express from "express";
import bodyParser from "body-parser";
var app = express();
app.use(bodyParser.json());
app.use(express.static("images"));

import framework from "./framework/framework.js";

import basicController from "./controller/basicControllers.js";
import reviewControllers from "./controller/reviewControllers.js";

async function start() {
  await mongo.init();
}
start();

  basicController(framework);
  reviewControllers(framework);

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
