import ReviewForm from '../cards/review-form.js';
let reviewForm = new ReviewForm('application/vnd.microsoft.card.adaptive');

import Scheduler from "../scheduler/scheduler.js";

export default function(framework){
    var scheduler = new Scheduler([1,2,3] ,new Date(new Date().getTime() + 600) );
    // Process an Action.Submit button press
    framework.on('attachmentAction', function (bot, trigger) {
    if (trigger.type != 'attachmentAction') {
        throw new Error(`Invaid trigger type: ${trigger.type} in attachmentAction handler`);
    }
    let attachmentAction = trigger.attachmentAction;
    
    // inputForm.handleSubmit(attachmentAction, trigger.person , bot);
    reviewForm.handleSubmit(attachmentAction, trigger.person , bot);
});
    
    framework.hears(
        "manage review",
        (bot, trigger) => {
            console.log("someone asked for a card");
            reviewForm.renderCard(bot);
        },
        "**manage review**: (Form to onboard a review with reviewers)",
        0
    );

    framework.hears(
        "read db",
        async (bot, trigger) => {
            await scheduler.loadReviewerInfo()
        },
        0
    );

    framework.hears(
        "schedule",
        () => {
            scheduler.scheduleJobAtDateTime(new Date(current.getTime() + 600))
        },
        0
    );
}