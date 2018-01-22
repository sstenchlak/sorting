class MergeSortAlgorithm {
    prepare(numbersToSort, board) {
        super.prepare(numbersToSort, board);

        let count = numbersToSort.length;

        let presenter;

        // First slide
        for (let i in numbersToSort) {
            this.states[i] = {pos:{
                x: i*100,
                y: 0
            }};
        }

        presenter.addSlide("Podívejme se, jak bychom seřadili těchto " + count + "prvků seřadili algoritmem zvaným <b>merge sort</b>.", 4, this.states);
        presenter.addSlide("Algoritmus je rekurzivní, to znamená, že volá sám sebe. Nejprve se podívejme, co se bude dít uvnitř funkce, pokud zavoláme algoritmus na následující čísla.", 4, this.states);

        // Create groups
        let group = [];
        for (let i in numbersToSort) {
            group.push([i, numbersToSort[i]]);
        }

        let groups = this._splitToHalf(group, 0);

        presenter.addSlide("Pole jsme si rozdělili na dvě dvě půlky. To co teď provedeme, je že na každou z těchto polovin zavoláme zvlášť merge sort. Protože víme, že merge sort umí třídit, dostaneme již setříděné pole.", 4, this.states);

        // Sort halves
        this._sort(groups[0],0);
        this._sort(groups[1],100*groups[0].length + 100);

        presenter.addSlide("Nyní tedy máme 2 seřazená pole a jediným zbývajícím úkolem je spojit je. Přitom se vždy stačí dívat na první prvky v obou polích, ty porovnat a ten menší odebrat a dát do výsledného pole.", 4, this.states);

        this._fullMergeOperation(groups[0], groups[1], 0, 0);

        for (let i in group) {
            this.states[group[i][0]].stroke = [255, 255, 255];
        }

        presenter.addSlide("A to je vše. Takto funguje merge sort z pohledu jedné instance funkce. Otázkou stále zůstává, jak seřadit ony dvě půlky rozděleného pole...", 4, this.states);
    }

    _splitToHalf(group, offset) {
        let half = Math.round(count/2);
        let lgroup = [];
        let rgroup = [];
        for (let i in group) {
            this.states[group[i][0]].pos.x = offset + i*100 + (i+1>half ? 100 : 0);
            this.states[group[i][0]].pos.y = 200;
            if (i+1>half)
                rgroup.push(group[i]);
            else
                lgroup.push(group[i]);
        }
        return [lgroup, rgroup];

    }

    _sort(group, offset) {
        group.sort((a,b)=>a[1]-b[1]);
        for (let i in group) {
            this.states[group[i][0]].pos.x = offset + i*100;
        }
    }


    /**
     *
     * @param left Group of elements on left side, dorted
     * @param right
     * @param xbase Where to start adding elements
     * @param ybase
     * @private
     */
    _fullMergeOperation(left, right, xbase, ybase) {
        let leftPointer = 0;
        let rightPointer = 0;

        let offsetCounter = 0;

        while (left.length != leftPointer && right.length != rightPointer) {
            this.states[left[leftPointer][0]].stroke = [255, 200, 0];
            this.states[right[rightPointer][0]].stroke = [255, 50, 0];

            let text = "";
            if (left[leftPointer][1] == right[rightPointer][1]) {
                text = "Oba čísla mají stejnou hodnotu " + left[leftPointer][1] + ". To ale nevadí. Protože testujeme <i>je menší, nebo rovno</i>, tak vybereme prvek z levé části.";
            } else {
                text = "Vybereme menší prvek, tedy " + Math.min(left[leftPointer][1], right[rightPointer][1]) + ".";
            }

            text += " Ten přesuneme do výsledného pole.";

            this.presenter.addSlide(text, 4, this.states);

            let movingElement ;
            if (left[leftPointer][1] <= right[rightPointer][1]) {
                movingElement = this.states[left[leftPointer][0]];
                leftPointer++;
            } else {
                movingElement = this.states[right[rightPointer][0]];
                rightPointer++;
            }

            movingElement._state.pos.y = 0;
            movingElement._state.pos.x = offsetCounter*100;
            offsetCounter++;

            // Number has been moved
        }

        this.presenter.addSlide("Přesunulo se poslední číslo, nyní máme jedno pole prázdné a jedno stále plné. To ale nevadí, jednoduše všechny prvky přesuneme do výsledného pole.", 4, this.states);

        while (left.length != leftPointer) {
            this.states[left[leftPointer][0]]._state.pos.y = 0;
            this.states[left[leftPointer][0]]._state.pos.x = offsetCounter*100;
            leftPointer++;
        }

        if (right.length != rightPointer) {
            this.states[right[rightPointer][0]]._state.pos.y = 0;
            this.states[right[rightPointer][0]]._state.pos.x = offsetCounter*100;
            rightPointer++;
        }

        this.presenter.addSlide("Hotovo, právě jsme spojili dvě pole v jedno, tedy daná funkce merge sortu může skončit...", 4, this.states);

    }
}