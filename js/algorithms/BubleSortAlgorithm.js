class BubleSortAlgorithm extends Algorithm {
    prepare (numbersToSort, board, presenter) {
        // Create numbers
        super.prepare(numbersToSort, board, presenter);

        let count = numbersToSort.length;

        // First slide
        for (let i in numbersToSort) {
            this.states[i].pos.x = i*100;
        }

        this.presenter.addSlide("Podívejme se, jak bychom seřadili těchto " + count + " prvků algoritmem zvaným <b>buble sort</b>.", 4, this.states, this.staticActors);
        this.presenter.addSlide("Algoritmus je velmi jednoduchý, porovnává postupně vždy dva prvky a prohodí je, pokud jsou ve špatném pořadí. Můžeme si tedy povšimnout, že největší prvek vždy \"probublá\" až na konec.", 4, this.states, this.staticActors);

        // Create groups
        let group = [];
        for (let i in numbersToSort) {
            group.push([i, numbersToSort[i]]);
        }

        let swaps = this._oneBuble(group);

        this.presenter.addSlide("Došli jsme do konce a provedli jsme " + swaps + " přehození. Pole stále není seřazené, proto ho budeme procházet tak dlouo, dokud stále bude co přehazovat.", 4, this.states, this.staticActors);

        do {
            swaps = this._oneBuble(group, true);
            if (swaps)
                this.presenter.addSlide("V poli jsme provedli " + swaps + " přehození. Pokračujme tedy dále.", 3, this.states, this.staticActors);
            else {
                this.staticActors.background.colors = BackgroundActor.COLORS_RED;
                this.presenter.addSlide("Tentokrát jsme nic nepřehodili a pole je tedy seřazené. Toto je celý buble sort.", 3, this.states, this.staticActors);
            }
        } while (swaps);

        this.presenter.addSlide("Děkuji za pozornost.", 4, this.states, this.staticActors);

    }

    _oneBuble(group, fast = false) {
        let swaps = 0;
        for (let pointer = 0; pointer < group.length - 1; pointer++) {
            let left = group[pointer][1];
            let right = group[pointer+1][1];

            this.states[group[pointer][0]].size = 1.4;
            this.states[group[pointer+1][0]].size = 1.4;

            let text;

            if (left < right) {
                text = "Prvky jsou ve správném pořadí. " + left + " je menší, než " + right + ". Neděláme tedy nic.";
            } else if (left === right) {
                text = "Prvky mají oba stejnou hodnotu " + left + ", není třeba nic dělat.";
            } else {
                text = left + " je větší, než " + right + ". Musíme prvky přehodit.";
            }

            this.presenter.addSlide(fast ? "<i>Procházíme jednotlivé dvojice a pokud jsou ve špatném pořadí, prohodíme je...</i>" : text, fast ? 1 : 2, this.states, this.staticActors);

            if (left > right) {
                // switch
                this.states[group[pointer][0]].pos.x = pointer*100 + 100;
                this.states[group[pointer+1][0]].pos.x = pointer*100;

                let sw = group[pointer];
                group[pointer] = group[pointer+1];
                group[pointer+1] = sw;
                swaps++;
            }

            // remove stroke
            this.states[group[pointer][0]].size = 1;
            this.states[group[pointer+1][0]].size = 1;
        }

        return swaps;
    }
}