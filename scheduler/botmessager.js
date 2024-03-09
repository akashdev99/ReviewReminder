import mongo from "../database/mongo.js"
import framework from "../framework/framework.js";


const WebexSpaceTitle = "Review Report";

class BotMessager {
    reviewerRooms ={};

    async sendMessage(reviewerInfo) {
        if(Object.keys(this.reviewerRooms).length==0) {
            const userRooms = await mongo.UserWebexRooms.getAllUserRooms();
            userRooms.forEach(user => {
                this.reviewerRooms[user.Id] = user.roomId;
            })
        }

        Object.keys(reviewerInfo).forEach(
        reviewerId=>{
           if (this.reviewerRooms[reviewerId]){
            let reviewerRoomId = this.reviewerRooms[reviewerId];
            
            framework.webex.messages
            .create({
              text: 'Wazzuzpp!',
              roomId: reviewerRoomId,
            })
            .then((teams) => {
              console.log(teams);
              return 'success';
            });
             
           }else{
                framework.webex.rooms
                .create({title:  WebexSpaceTitle})
                .then((team) => {
                    console.log(team);
                    console.log(reviewerId);

                 
                    framework.webex.memberships.create({
                        personEmail: reviewerId,
                        roomId: team.id
                    }).catch((err)=>{
                        console.log(err);
                    });
                    
                    mongo.UserWebexRooms.addUserRoom({Id: reviewerId , roomId: team.id})
                });
           }
        })
    }
}

export default BotMessager;