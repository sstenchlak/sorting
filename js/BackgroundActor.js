class BackgroundActor extends Actor {
    constructor(background, board) {
        super(board);
        this._container = background;
        this._colorIndices = [0,1,2,3];
        this._step = 0;
        this._state = {
            colors: [
                [35,166,213],
                [35,216,171],
                [141,40,218],
                [87,58,218]
            ],
            gradientSpeed: 0.002
        };

        setInterval(() => this._updateGradient(), 10);
    }

    _updateGradient()
    {
        let c0_0 = this._state.colors[this._colorIndices[0]];
        let c0_1 = this._state.colors[this._colorIndices[1]];
        let c1_0 = this._state.colors[this._colorIndices[2]];
        let c1_1 = this._state.colors[this._colorIndices[3]];

        let istep = 1 - this._step;
        let r1 = Math.round(istep * c0_0[0] + this._step * c0_1[0]);
        let g1 = Math.round(istep * c0_0[1] + this._step * c0_1[1]);
        let b1 = Math.round(istep * c0_0[2] + this._step * c0_1[2]);
        let color1 = "rgb("+r1+","+g1+","+b1+")";

        let r2 = Math.round(istep * c1_0[0] + this._step * c1_1[0]);
        let g2 = Math.round(istep * c1_0[1] + this._step * c1_1[1]);
        let b2 = Math.round(istep * c1_0[2] + this._step * c1_1[2]);
        let color2 = "rgb("+r2+","+g2+","+b2+")";

        this._container.css({
            background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
            background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"}).css({
            background: "linear-gradient(to right top, "+color1+", "+color2+")"});

        this._step += this._state.gradientSpeed;
        if ( this._step >= 1 )
        {
            this._step %= 1;
            this._colorIndices[0] = this._colorIndices[1];
            this._colorIndices[2] = this._colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            this._colorIndices[1] = ( this._colorIndices[1] + Math.floor( 1 + Math.random() * (this._state.colors.length - 1))) % this._state.colors.length;
            this._colorIndices[3] = ( this._colorIndices[3] + Math.floor( 1 + Math.random() * (this._state.colors.length - 1))) % this._state.colors.length;

        }
    }
}