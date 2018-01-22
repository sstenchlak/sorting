class TextHelpActor extends Actor {
    constructor(textContainer, board) {
        super(board);
        this._container = textContainer;
        this._state = {
            text: ""
        };
    }

    setState(status, immediately) {
        if (this._state.text == status.text) return;
        this._state.text = status.text;

        this._container.find('.text-help').stop().fadeTo(immediately ? 0 : this._board.animator.duration / 2, 0, () => {
            this._container.find('.text-help').remove();
            this._createNewText(status.text);
        });

    }

    _createNewText(newText, immediately) {
        let text = jQuery('<div></div>').appendTo(this._container).addClass('text-help').stop().fadeTo(0,0);
        jQuery('<p></p>').appendTo(text).html(newText);
        text.fadeTo(immediately ? 0 : this._board.animator.duration / 2, 1);
    }
}