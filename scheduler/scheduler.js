import schedule from 'node-schedule';
import framework from "../framework/framework.js";

import mongo from "../database/mongo.js"
import { Queue } from '@datastructures-js/queue';

import BotMessager from './botmessager.js';

class Scheduler {
    severity = ['1','2','3']
    triggerTime = new Date();
    botMessager= new BotMessager();
    
    constructor(severity, triggerTime) {
        this.severity = severity;
        this.triggerTime = triggerTime
    }
    

    scheduleJob(task){
        console.log("Scheduling a job");
        let current=  new Date();
        let later = new Date(current.getTime() + 600);
        const job = schedule.scheduleJob(later,
            
            async ()=>{
            let reviewerInfo  = await this.loadReviewerInfo();
            console.log(reviewerInfo);

            this.botMessager.sendMessage(reviewerInfo);            
            console.log("yup here outside")
            }
            );
        console.log(job);
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

                if(reviewerInfo[reviewer]){
                    reviewerInfo[reviewer].push(reviewObj);
                }else{
                    reviewerInfo[reviewer] = [reviewObj];
                }
           })
        });
        return reviewerInfo;
    }
}

export default Scheduler;