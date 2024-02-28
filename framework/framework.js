var framework = require("webex-node-bot-framework");
var config = require("../config/config")

var framework = new framework(config);
framework.start();
console.log("Starting framework, please wait...");

module.exports = framework;