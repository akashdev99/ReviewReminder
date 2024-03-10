import ReviewForm from '../../cards/review-form.js';
let reviewForm = new ReviewForm('application/vnd.microsoft.card.adaptive');
import Scheduler from "../../scheduler/scheduler.js";
import ReviewSummarizer from './reviewSummarizer.js';

export default function(framework){
    const scheduler = new Scheduler([1,2,3] ,new Date(new Date().getTime() + 600) );
    const reviewSummarizer = new ReviewSummarizer();

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
            reviewForm.renderCard(bot);
        },
        "**manage review**: (Form to onboard a review with reviewers)",
        0
    );

    framework.hears(
        "schedule",
        (bot, trigger) => {
            console.log("come here");
            scheduler.scheduleJobAtDateTime(new Date(new Date().getTime() + 600), reviewSummarizer.summarizeTask)
        },
        "**manage review**: (Form to onboard a review with reviewers)",
        0
    );

    framework.hears(
        "show my reviews",
        () => {
            reviewSummarizer.summarizeTask();
        },
        "**show my reviews**: (Show all pending reviews)",
        0
    );
}