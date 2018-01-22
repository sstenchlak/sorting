var board; // Global accessible

/**
 * Helper functions
 */

function cloneObject(obj) {
    let clone = {};
    for(let i in obj) {
        if(typeof(obj[i])=="object" && obj[i] != null)
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}

function generateRandomNumbers() {
    return Array.from({length: 10 + Math.floor(Math.random() * 5)}, () => Math.floor(Math.random() * 15));
}

$(function(){

    // Register application
    board = new Board();

    board.registerSpeedSlider($('.speed-slider'));
    board.registerBackgroundElement($('#background, #menu'));
    board.registerTextContainer($('#texts'));
    board.registerSVG($('#board'));
    board.registerPresentationSlider($('.presentation-slider').eq(0));

    let buttons = $('#buttons').find('button');

    buttons.eq(0).click(()=>board.FastBackward());
    buttons.eq(1).click(()=>board.Backward());
    board.registerPlayPauseButton(buttons.eq(2));
    buttons.eq(3).click(()=>board.Forward());
    buttons.eq(4).click(()=>board.FastForward());
    buttons.eq(5).click(()=>board.Stop());

    board.registerMainmenu($('#menu'));

    // Register hotkeys
    $(document).keydown(function(e) {
        switch (e.which) {
            case 36:
                board.FastBackward();
                break;
            case 33:
            case 37:
                board.Backward();
                break;
            case 32:
                break;
            case 39:
            case 34:
                board.Forward();
                break;
            case 35:
                board.FastForward();
                break;
        }
    });

    // Register window resize
    $(window).resize(() => board.updated());

});
