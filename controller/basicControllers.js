export default function(framework){
    framework.on("initialized", () => {
        console.log("framework is all fired up! [Press CTRL-C to quit]");
      });
      
      // A spawn event is generated when the framework finds a space with your bot in it
      // If actorId is set, it means that user has just added your bot to a new space
      // If not, the framework has discovered your bot in an existing space
      framework.on("spawn", (bot, id, actorId) => {
        if (!actorId) {
          // don't say anything here or your bot's spaces will get
          // spammed every time your server is restarted
          console.log(
            `While starting up, the framework found our bot in a space called: ${bot.room.title}`
          );
        } else {
          // When actorId is present it means someone added your bot got added to a new space
          // Lets find out more about them..
          var msg =
            "You can say `help` to get the list of words I am able to respond to.";
          bot.webex.people
            .get(actorId)
            .then((user) => {
              msg = `Hello there ${user.displayName}. ${msg}`;
            })
            .catch((e) => {
              console.error(
                `Failed to lookup user details in framwork.on("spawn"): ${e.message}`
              );
              msg = `Hello there. ${msg}`;
            })
            .finally(() => {
              // Say hello, and tell users what you do!
              if (bot.isDirect) {
                bot.say("markdown", msg);
              } else {
                let botName = bot.person.displayName;
                msg += `\n\nDon't forget, in order for me to see your messages in this group space, be sure to *@mention* ${botName}.`;
                bot.say("markdown", msg);
              }
            });
        }
      });
      
      framework.on("log", (msg) => {
        console.log(msg);
      });
      
      framework.hears(
        "create",
        (bot) => {
          console.log("say hi to everyone.  Its a party");
          framework.webex.rooms
            .create({title:  'TestRoomS'})
            .then(function(team) {
              console.log(team);

              framework.webex.memberships.create({
                personEmail: 'avattoly@cisco.com',
                roomId: team.id
              });
            });
        },
        "**say hi to everyone**: (everyone gets a greeting using a call to the Webex SDK)",
        0
      );

      framework.hears(
        "message",
        (bot) => {
          console.log("Unicasting");
          bot.webex.messages
            .create({
              text: 'Wazzuzpp!',
              roomId: 'Y2lzY29zcGFyazovL3VzL1JPT00vMGU1ZTljNDAtZDYzYi0xMWVlLWFhY2ItOWI5YTg3MWRlYjJk'
            })
            .then(function(teams) {
              console.log(teams);
              return 'success';
            });
        },
        "**say hi to everyone**: (everyone gets a greeting using a call to the Webex SDK)",
        0
      );

      framework.hears(
        "list",
        (bot) => {
          console.log("say hi to everyone.  Its a party");
          bot.webex.teams
            .list({max: 10})
            .then(function(teams) {
              console.log(teams);
              return 'success';
            });
        },
        "**say hi to everyone**: (everyone gets a greeting using a call to the Webex SDK)",
        0
      );

}