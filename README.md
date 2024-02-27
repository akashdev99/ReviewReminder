# ReviewReminder

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

