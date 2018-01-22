class Actor {
    constructor(board) {
        this._state = {};
        this._board = board;
    }

    mapState(lastStatus, newStatus, status, val) {
        for(let index in newStatus) {
            if (typeof lastStatus[index] === 'object')
                this.mapState(lastStatus[index], newStatus[index], status[index], val);
            else
                if (typeof status[index] == 'number')
                    status[index] = lastStatus[index] + val*(newStatus[index]-lastStatus[index]);
                else
                    status[index] = newStatus[index];
        }
    }

    setState(status, immediately) {
        if (immediately) {
            this._state = status;
            this._redraw();
            return;
        }
        let lastStatus = Object.assign({}, this._state);
        this._board.animator.animate((v) => {
            this.mapState(lastStatus, status, this._state, v);
            this._redraw();
        })
    }

    _redraw() {
        this._board.updated();
    }

    static createSVGelement(n) {
        return document.createElementNS("http://www.w3.org/2000/svg", n);
    }
}