class NumberActor extends Actor {
    constructor(number, board) {
        super(board);

        this._state = {
            pos: {
                x: 0,
                y: 0
            },
            size: 1,
            color: {
                R: 255,
                G: 255,
                B: 255
            },
            text: {
                R: 0,
                G: 0,
                B: 0
            },
            stroke: [255, 255, 255]
        };

        this._elementCircle = jQuery(Actor.createSVGelement('circle')).appendTo(board.scaleLayer);
        this._elementText = jQuery(Actor.createSVGelement('text')).appendTo(board.scaleLayer);
        this._elementText.text(number);
    }

    _redraw(){
        this._elementCircle
            .attr('cx', this._state.pos.x)
            .attr('cy', this._state.pos.y)
            .attr('r', this._state.size*30)
            .attr('fill', 'rgb(' + Math.round(this._state.color.R) + ',' + Math.round(this._state.color.G) + ','+ Math.round(this._state.color.B) + ')');
        this._elementText
            .attr('x', this._state.pos.x)
            .attr('y', this._state.pos.y)
            .attr('font-size', this._state.size*30)
            .attr('fill', 'rgb(' + Math.round(this._state.text.R) + ',' + Math.round(this._state.text.G) + ','+ Math.round(this._state.text.B) + ')');
        this._board.updated();
    }

}