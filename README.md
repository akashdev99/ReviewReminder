# ReviewReminder

## Steps to get the bot working

Start project :

1) Start ngrok server :
ngrok http 3000 --region=eu

If above does not work use via docker :
docker run --net=host -it -e NGROK_AUTHTOKEN=<auth_token_here> ngrok/ngrok:latest http host.docker.internal:3000 --region=eu


2) run : docker-compose up

Access db on docker using : docker exec -it mongo-bot mongosh

3) make .env files with public address and TOKEN , format :
```
BOTTOKEN - Set this to the token for your bot that you got in step 1
PORT - Set this to the port you set when you started ngrok in step 3 (ie: 3000)
WEBHOOKURL - Set this to the ip address that you copied in step 4
SCHEDULER_TIME = Set time at which scheduler should trigger the alerts to reviewers ex: "45 12 * * *" . formay "MM HH DD MM YY"
```

4) Start bot server :
npm start

5) Open space with webex bot : reviewrabbit@webex.bot

6) Start messaging 

