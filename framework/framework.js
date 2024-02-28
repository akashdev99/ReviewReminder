import Framework from "webex-node-bot-framework";
import config from "../config/config.js";

var framework = new Framework(config);
framework.start();
console.log("Starting framework, please wait...");

export default framework;