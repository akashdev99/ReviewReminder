import mongo from "../../database/mongo.js"
import BotMessager from '../../app/botMessager/botmessager.js';

export default class ReviewSummarizer {
    async summarizeTask(){
        const reviews = await mongo.Review.getAllReviews();

        let reviewerInfo ={};
        reviews.forEach(element => {
        element.reviewers.forEach((reviewer)=>{
                let reviewObj = {
                    reviewLink: element.pr,
                    severity : element.severity,
                }

                if (reviewerInfo[reviewer]){
                    reviewerInfo[reviewer].push(reviewObj)
                }else{
                    reviewerInfo[reviewer] = [reviewObj];
                } 
            })
        });

        const botMessager= new BotMessager();
        botMessager.sendReviewSummary(reviewerInfo);            
    } 
}