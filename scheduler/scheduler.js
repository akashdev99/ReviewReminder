import schedule from 'node-schedule';

export default class Scheduler {
    severity = ['1','2','3']
    // 12:30 IST by default 
    triggerTime = "30 12 * * *";
    
    constructor(severity, triggerTime) {
        this.severity = severity;
        this.triggerTime = triggerTime
    }

    scheduleRecurringJob(callback){
        schedule.scheduleJob(this.triggerTime,
            callback
        );
    }
    
    scheduleJobAtDateTime(time , callback){
        schedule.scheduleJob(time,
            callback
        );
    }
}