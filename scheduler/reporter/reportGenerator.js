import GithubReporter from "./githubReporter.js"
import SwarmReporter from "./swarmReporter.js"
import BitbuckerReporter from "./bitbucketReporter.js"

export default class ReportGenerator {
    githubReporter = new GithubReporter();
    swarmReporter = new SwarmReporter();
    bitbuckerReporter = new BitbuckerReporter();


    async generateReport(reviewList) {
        let reportObjList =[];
        reviewList.forEach(review => {
            let reviewReport = this.delegateToReporter(review.reviewLink)
            if (reviewReport.length != 0){
                reportObjList.push(reviewReport);
            }
        });
        //TODO : need to add priortity to the listing 
        return this.stringifyReport(reportObjList);
    }

    delegateToReporter(reviewLink){
        if(reviewLink.includes("github")){
            return this.githubReporter.generate(reviewLink);
        }else if(reviewLink.includes("swarm")){
            return this.swarmReporter.generate(reviewLink);
        }else if(reviewLink.includes("bitbucket")){
            return this.bitbuckerReporter.generate(reviewLink);
        }else{
            return "";
        }
    }

    stringifyReport(reportObjList){
        let report = "Your Review Report 🗒️ : \n\n";
        reportObjList.forEach((reportObj,index)=>{
            report += `${index+1}) Review : ${reportObj.reviewLink} ,Description : ${reportObj.description} , Author: ${reportObj.author}  , pending days: 12days , Severity: ${reportObj.severity} \n\n`
        });
        return report;
    }
}