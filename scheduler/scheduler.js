import schedule from 'node-schedule';
import mongo from "../database/mongo.js"
import BotMessager from './botmessager.js';

export default class Scheduler {
    severity = ['1','2','3']
    // 12:30 IST by default 
    triggerTime = "30 12 * * *";
    botMessager= new BotMessager();
    
    constructor(severity, triggerTime) {
        this.severity = severity;
        this.triggerTime = triggerTime
    }

    scheduleRecurringJob(){
        schedule.scheduleJob(this.triggerTime,
            async ()=>{
            console.log("scheduled called");
            let reviewerInfo  = await this.loadReviewerInfo();
            this.botMessager.sendMessage(reviewerInfo);            
            }
        );
    }
    
    scheduleJobAtDateTime(time){
        schedule.scheduleJob(time,
            async ()=>{
            let reviewerInfo  = await this.loadReviewerInfo();
            this.botMessager.sendMessage(reviewerInfo);            
            }
        );
    }

    async loadReviewerInfo(){
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
        return reviewerInfo;
    }
}