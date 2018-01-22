class NumberActor extends Actor {
    constructor(number, board) {
        super(board);

        this._state = {
            pos: {
                x: 0,
                y: 0
            },
            size: 1,
            color: [255, 255, 255],
            text: [0, 0, 0],
            stroke: [255, 255, 255]
        };

        this._elementCircle = jQuery(Actor.createSVGelement('circle')).appendTo(board.scaleLayer);
        this._elementText = jQuery(Actor.createSVGelement('text')).appendTo(board.scaleLayer);
        this._elementText.text(number);
    }

    destructor () {
        this._elementCircle.remove();
        this._elementText.remove();
    }

    _redraw(){
        this._elementCircle
            .attr('cx', this._state.pos.x)
            .attr('cy', this._state.pos.y)
            .attr('r', this._state.size*30)
            .attr('fill', 'rgb(' + Math.round(this._state.color[0]) + ',' + Math.round(this._state.color[1]) + ','+ Math.round(this._state.color[2]) + ')')
            .attr('stroke-width', this._state.size*3)
            .attr('stroke', 'rgb(' + Math.round(this._state.stroke[0]) + ',' + Math.round(this._state.stroke[1]) + ','+ Math.round(this._state.stroke[2]) + ')');
        this._elementText
            .attr('x', this._state.pos.x)
            .attr('y', this._state.pos.y)
            .attr('font-size', this._state.size*30)
            .attr('fill', 'rgb(' + Math.round(this._state.text[0]) + ',' + Math.round(this._state.text[1]) + ','+ Math.round(this._state.text[2]) + ')');
        this._board.updated();
    }

}