module.exports = function(framework){
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
          "framework",
          (bot) => {
            console.log("framework command received");
            bot.say(
              "markdown",
              "The primary purpose for the [webex-node-bot-framework](https://github.com/jpjpjp/webex-node-bot-framework) was to create a framework based on the [webex-jssdk](https://webex.github.io/webex-js-sdk) which continues to be supported as new features and functionality are added to Webex. This version of the project was designed with two themes in mind: \n\n\n * Mimimize Webex API Calls. The original flint could be quite slow as it attempted to provide bot developers rich details about the space, membership, message and message author. This version eliminates some of that data in the interests of efficiency, (but provides convenience methods to enable bot developers to get this information if it is required)\n * Leverage native Webex data types. The original flint would copy details from the webex objects such as message and person into various flint objects. This version simply attaches the native Webex objects. This increases the framework's efficiency and makes it future proof as new attributes are added to the various webex DTOs "
            );
          },
          "**framework**: (learn more about the Webex Bot Framework)",
          0
        );
}