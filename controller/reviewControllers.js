ReviewForm = require('../cards/review-form')
let reviewForm = new ReviewForm('application/vnd.microsoft.card.adaptive');

module.exports = function(framework){
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
        "**card me**: (a cool card!)",
        0
    );
}