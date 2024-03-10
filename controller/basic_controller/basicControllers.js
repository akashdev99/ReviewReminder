export default function(framework){
    framework.on("initialized", () => {
        console.log("framework is all fired up! [Press CTRL-C to quit]");
      });

    /* On mention with command
    ex User enters @botname help, the bot will write back in markdown
    *
    * The framework.showHelp method will use the help phrases supplied with the previous
    * framework.hears() commands
    */
    framework.hears(
      /help|what can i (do|say)|what (can|do) you do/i,
      (bot, trigger) => {
        console.log(`someone needs help! They asked ${trigger.text}`);
        bot
          .say(`Hello ${trigger.person.displayName}.`)
          .then(() => bot.say("markdown", framework.showHelp()))
          .catch((e) => console.error(`Problem in help hander: ${e.message}`));
      },
      "**help**: (what you are reading now)",
      0
    );

    /* On mention with unexpected bot command
    Its a good practice is to gracefully handle unexpected input
    Setting the priority to a higher number here ensures that other 
    handlers with lower priority will be called instead if there is another match
    */
    framework.hears(
      /.*/,
      (bot, trigger) => {
        // This will fire for any input so only respond if we haven't already
        console.log(`catch-all handler fired for user input: ${trigger.text}`);
        bot
          .say(`Sorry, I don't know how to respond to "${trigger.text}"`)
          .then(() => bot.say("markdown", framework.showHelp()))
          //    .then(() => sendHelp(bot))
          .catch((e) =>
            console.error(`Problem in the unexepected command hander: ${e.message}`)
          );
      },
      99999
    );

    
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
            msg = `Hello  , I am ReviewRabbit . I have opened this space to help track , remind and prioritize your reviews . ${msg}`;
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
              // msg += `\n\nDon't forget, in order for me to see your messages in this group space, be sure to *@mention* ${botName}.`;
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
      0
    );

}