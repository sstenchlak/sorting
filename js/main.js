var board;
var aa = [];

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

$(function(){
    board = new Board();

    board.registerSpeedSlider($('.speed-slider'));
    board.registerBackgroundElement($('#background'));
    board.registerTextContainer($('#texts'));
    board.registerSVG($('#board'));
    board.registerPresentationSlider($('.presentation-slider').eq(0));

    $('#buttons').find('button').eq(0).click(()=>board.FastBackward());
    $('#buttons').find('button').eq(1).click(()=>board.Backward());
    board.registerPlayPauseButton($('#buttons').find('button').eq(2));
    $('#buttons').find('button').eq(3).click(()=>board.Forward());
    $('#buttons').find('button').eq(4).click(()=>board.FastForward());

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

    $(window).resize(() => board.updated());

   /* for (let i = 1; i < 8; i++) {
        b = new NumberActor(i, board);
        b._state.pos.x = 100*i;
        b._redraw();
        aa.push(b);
    }*/

});
/*
function foo() {
    for (let i = 1; i < 4; i++) {
        aa[i-1].setState({pos:{x: 100*i - 100}, stroke: [255, 200, 0]});
    }
    aa[3].setState({pos:{y: 200},size:2});
    for (let i = 5; i < 8; i++) {
        aa[i-1].setState({pos:{x: 100*i + 100}, stroke: [255, 50, 0]});
    }
    board.textHelpActor.setState({text:"Vybrali jsme prostřední prvek..."});
    board.backgroundActor.setState({colors:[[62,35,255],
        [60,255,60],
    [255,35,98],
        [45,175,230]]});
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        foo();
    }
}*/