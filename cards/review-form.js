const mongodb = require("../database/db");
const { v4: uuidv4 } = require('uuid');

class ReviewForm {
    constructor(contentType) {
      this.card = require('./design/review_form.json');
      this.contentType = contentType;
    }
  
    async renderCard(bot) {
      try {
        await bot.say('This Review Manager Card');
        let card = JSON.parse(JSON.stringify(this.card));
        await bot.sendCard(card, "If you see this your client cannot render our Input Form example.").catch((e)=>console.log(e));
  
      } catch (err) {
        let msg = 'Failed to render Input Form card example.';
        // logger.error(`${msg} Error:${err.message}`);
        bot.say(`${msg} Please contact the Webex Developer Support: https://developer.webex.com/support`)
          .catch((e) => console.log("something went wrong "));
      }
    };
  
    getNameList(names) {
        return names.trim().split(/[ ,]+/);
    }

    async  handleSubmit(attachmentAction, submitter, bot) {
      let inputs = attachmentAction.inputs;
      console.log(inputs);
      reviewers:inputs.reviewers.sp
      var reviewObj = {id:uuidv4() , pr:inputs.reviewlink , reviewers:getNameList(inputs.reviewers) , mandatoryreviewers:getNameList(inputs.mandatoryReviewers), severity: inputs.severity};
      try {
          await mongodb.savePr(reviewObj);
          bot.reply(attachmentAction, "Onboarded review")
          .catch((e) => console.log("something went wrong "));
      }catch(err) {
          console.log("Something went wrong",err);
      }
    };
  
  };
  
  module.exports = ReviewForm;