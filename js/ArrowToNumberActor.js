class ArrowToNumberActor extends Actor {
    constructor(board) {
        super(board);

        this._state = {
            pos: {
                x: 0,
                y: 0
            },
            size: 1,
            color: [255, 255, 255],
            opacity: 0,
        };

        this._elementPolygon = jQuery(Actor.createSVGelement('polygon')).appendTo(board.scaleLayer);
    }

    _redraw(){
        let topx = this._state.pos.x;
        let topy = this._state.pos.y + this._state.size*40;
        let d = 10;
        let bottomy = topy + d * Math.sqrt(3)/2;
        let leftx = topx - d/2;
        let rightx = topx + d/2;
        this._elementPolygon
            .attr('points',  topx + ',' + topy + ' ' + leftx + ',' + bottomy + ' ' + rightx + ',' + bottomy)
            .attr('fill', 'rgb(' + Math.round(this._state.color[0]) + ',' + Math.round(this._state.color[1]) + ','+ Math.round(this._state.color[2]) + ')')
            .toggleClass('not-exists', !this._state.opacity)
            .attr('opacity', this._state.opacity);
        this._board.updated();
    }

}