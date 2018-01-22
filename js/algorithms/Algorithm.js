class Algorithm {
    prepare(numbersToSort, board) {
        this.children = [];
        this.states = [];
        for (let i in numbersToSort) {
            let element = new NumberActor(numbersToSort[i], board);
            this.children.push(element);
            this.states.push(Object.assign({}, element._state));
        }
    }
}