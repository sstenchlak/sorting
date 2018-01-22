class InsertionSortAlgorithm extends Algorithm {
    prepare (numbersToSort, board, presenter) {
        // Create numbers
        super.prepare(numbersToSort, board, presenter);

        let count = numbersToSort.length;

        // First slide
        for (let i in numbersToSort) {
            this.states[i].pos.x = i*100;
        }

        this.presenter.addSlide("Podívejme se, jak bychom seřadili těchto " + count + " prvků algoritmem zvaným <b>insertion sort</b>.", 4, this.states, this.staticActors);
        this.presenter.addSlide("Algoritmus vybere první prvek, ten je triviálně seřazen. Poté přidává další prvky, které porovnává s ostatními již seřazenými.", 4, this.states, this.staticActors);

        // Create groups
        let group = [];
        for (let i in numbersToSort) {
            group.push([i, numbersToSort[i]]);
        }

        this.states[group[0][0]].pos.y = -300;
        this.presenter.addSlide("První prvek je tedy triviálně seřazený.", 4, this.states, this.staticActors);

        for (let pointer = 1; pointer < group.length; pointer++) {
            this.states[group[pointer][0]].pos.y = -200;
            this.presenter.addSlide("Vytáhli jsme z pole prvek " + group[pointer][1] +", nyní ho zařaďme jednoduchým porovnáním.", 3, this.states, this.staticActors);

            let element = group[pointer];

            let right = group[pointer][1];
            for (let swappointer = pointer-1; swappointer >= 0; swappointer--) {
                let left = group[swappointer][1];

                if (left > right) {
                    // switch
                    this.states[group[swappointer][0]].pos.x = swappointer*100 + 100;
                    this.states[group[swappointer+1][0]].pos.x = swappointer*100;

                    let sw = group[swappointer];
                    group[swappointer] = group[swappointer+1];
                    group[swappointer+1] = sw;

                    this.presenter.addSlide(null, 2, this.states, this.staticActors);

                } else break;
            }

            this.states[element[0]].pos.y = -300;
            this.presenter.addSlide("Prvek " + right +" zařadíme na své místo.", 3, this.states, this.staticActors);
        }

        this.staticActors.background.colors = BackgroundActor.COLORS_RED;
        this.presenter.addSlide("Prvky došly, pole je seřazené.", 3, this.states, this.staticActors);
        this.presenter.addSlide("Děkuji za pozornost.", 4, this.states, this.staticActors);

    }
}