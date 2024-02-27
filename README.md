# Webex-Bot-Starter

### Starter kit and template for a simple Webex bot

_For a more detailed walkthorugh, see the [companion blog post here](https://developer.webex.com/blog/from-zero-to-webex-teams-chatbot-in-15-minutes)_

This is a very simple Webex node.JS bot application that serves as a template to be further extended. It features the [webex-node-bot-framework](https://github.com/webex/webex-bot-node-framework) that simplifies development for Webex bots by abstracting away some of the complexity of the API calls and registering for events. Some parts of the app are taken from on the old [sparkbotstarter](https://github.com/valgaze/sparkbotstarter) template created by Victor Algaze.

Here is the bot in action:

git
![What we're making](./images/webexbotstarter.gif)

## Prerequisites:

- [ ] node.js (minimum supported v8.0.0 & npm 2.14.12 and up)

- [ ] [Sign up for Webex Developer Account](https://developer.webex.com/signup)

---

## Steps to get the bot working

Start project :

1) Start ngrok server :
ngrok http 3000 --region=eu

2) docker run -d -p 27017:27017 --name=mongo-bot mongo:latest

Acess db on docker using : docker exec -it mongo-bot mongosh

3) make .env files with public address and TOKEN , format :
```
BOTTOKEN - Set this to the token for your bot that you got in step 1
PORT - Set this to the port you set when you started ngrok in step 3 (ie: 3000)
WEBHOOKURL - Set this to the ip address that you copied in step 4

```

4) Start bot server :
npm start

5) Open space with webex bot : reviewrabbit@webex.bot

6) Start messaging 

