import mongo from "../database/mongo.js"
import v4 from 'uuid';
import review_form from './design/review_form.json' assert { type: "json" };;

class ReviewForm {
    constructor(contentType) {
      this.card = review_form;
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
      var reviewObj = {id:v4() , pr:inputs.reviewlink , reviewers:this.getNameList(inputs.reviewers) , severity: inputs.severity};
      try {
        await mongo.Review.addReview(reviewObj);
        bot.reply(attachmentAction, "Onboarded review")
        .catch((e) => console.log("something went wrong "));
      }catch(err) {
          console.log("Something went wrong",err);
      }
    };
  
  };
  
 export default ReviewForm;