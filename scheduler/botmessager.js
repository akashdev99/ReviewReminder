import mongo from "../database/mongo.js"
import framework from "../framework/framework.js";
import ReportGenerator from "./reporter/reportGenerator.js"

const WebexSpaceTitle = "Review Report";
class BotMessager {
    reviewerRooms ={};
    reportGenerator = new ReportGenerator();

    async sendMessage(reviewerInfo) {
        if(Object.keys(this.reviewerRooms).length==0) {
            const userRooms = await mongo.UserWebexRooms.getAllUserRooms();
            userRooms.forEach(user => {
                this.reviewerRooms[user.Id] = user.roomId;
            })
        }

        Object.keys(reviewerInfo).forEach(
        async reviewerId=>{
            let report = await this.reportGenerator.generateReport(reviewerInfo[reviewerId]);

           if (this.reviewerRooms[reviewerId]){
            let reviewerRoomId = this.reviewerRooms[reviewerId];
            this.sendUnicast(reviewerRoomId , report);     
           }else{
                framework.webex.rooms
                .create({title:  WebexSpaceTitle})
                .then((team) => {                 
                    framework.webex.memberships.create({
                        personEmail: reviewerId,
                        roomId: team.id
                    }).then(()=>{
                        this.sendUnicast(team.id , report);
                        mongo.UserWebexRooms.addUserRoom({Id: reviewerId , roomId: team.id});
                        this.reviewerRooms[reviewerId] = team.Id;
                    }).catch((err)=>{
                        console.log("Failed to send message:",err);
                    });
                });
           }
        })
    }

    async sendUnicast(roomId , message){
        framework.webex.messages
            .create({
              text: message,
              roomId: roomId,
            })
            .then((teams) => {
              console.log("Report sent successfully");
              return 'success';
        }).catch((error) => {
            console.log("Report failed to send",error);
        });
    }

}

export default BotMessager;