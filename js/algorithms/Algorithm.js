class Algorithm {
    prepare(numbersToSort, board, presenter) {
        this.children = [];
        this.states = [];
        this.presenter = presenter;
        for (let i in numbersToSort) {
            let element = new NumberActor(numbersToSort[i], board);
            this.children.push(element);
            this.states.push(cloneObject(element._state));
        }
        this.staticActors = {};
        for (let i in board.staticActors) {
            this.staticActors[i] = cloneObject(board.staticActors[i]._state);
        }
    }

    destructor() {
        for (let i in this.children) {
            this.children[i].destructor();
            delete this.children[i];
        }
    }

    static getName() {}
    static getDescription() {}
}