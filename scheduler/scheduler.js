const schedule = require('node-schedule');
const controllerModule = require("../controller/controller")
const controller = controllerModule.controller
var framework = require("./framework/framework")

module.exports = {
    startup(){
        //check PR DB
        //re-add all cron schedule on restart 
    },
    addScheduler(bot,message){
        console.log("Add a scheduler here!!");
        let current=  new Date();
        let later = new Date(current.getTime() + 600);
        console.log(current);
        const job = schedule.scheduleJob(later,async ()=>{
            console.log("yup here")
            // console.log(bot);
            console.log("=====");
            
            let room = await framework.webex.rooms.create({title: 'botkit test room'});
            console.log(room);


            // controller.trigger('scheduler_complete', [bot, message])
            //else use controller.on
            //controller.trigger
            
            console.log("yup here outside")
          });
        console.log(job);
        //track teh scheduler
    },
    removeScheduler(){
        
    },
}
