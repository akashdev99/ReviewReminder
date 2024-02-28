import dotenv from "dotenv";
dotenv.config();
const config = {
    webhookUrl: process.env.WEBHOOKURL,
    token: process.env.BOTTOKEN,
    port: process.env.PORT,
  };

export default config;