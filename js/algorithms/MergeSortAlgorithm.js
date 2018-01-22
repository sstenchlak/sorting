class MergeSortAlgorithm extends Algorithm {
    prepare(numbersToSort, board, presenter) {
        // Create numbers
        super.prepare(numbersToSort, board, presenter);

        let count = numbersToSort.length;

        // First slide
        for (let i in numbersToSort) {
            this.states[i].pos.x = i*100;
        }

        this.presenter.addSlide("Podívejme se, jak bychom seřadili těchto " + count + " prvků algoritmem zvaným <b>merge sort</b>.", 4, this.states, this.staticActors);
        this.presenter.addSlide("Algoritmus je rekurzivní, to znamená, že volá sám sebe. Obvykle se tak složitá práce rozdělí na více jednodušších. Nejprve se podívejme, co se bude dít uvnitř jedné instance funkce, pokud zavoláme algoritmus na následující čísla.", 4, this.states, this.staticActors);

        // Create groups
        let group = [];
        for (let i in numbersToSort) {
            group.push([i, numbersToSort[i]]);
        }

        let groups = this._splitToHalf(group, 0, 200);

        this.presenter.addSlide("Pole jsme si rozdělili na dvě dvě poloviny. Nyní každou polovinu necháme zvlášť seřadit mereg sortem. Protože víme, že merge sort umí třídit, dostaneme setříděné pole.", 4, this.states, this.staticActors);

        // Sort halves
        this._sort(groups[0],0);
        this._sort(groups[1],100*groups[0].length + 100);

        this.presenter.addSlide("Máme tedy 2 seřazená pole a jediným zbývajícím úkolem je spojit je. Přitom se vždy stačí dívat na první prvky v obou polích, ty porovnat, menší odebrat a dát do výsledného pole.", 4, this.states, this.staticActors);

        this._fullMergeOperation(groups[0], groups[1], 0, 0);

        for (let i in group) {
            this.states[group[i][0]].stroke = [255, 255, 255];
        }

        this.presenter.addSlide("A to je vše. Takto funguje merge sort z pohledu jedné instance funkce. Podívejme se, jak merge sort pracuje ve skutečnosti...", 4, this.states, this.staticActors);
        /**
         * *************************************************************************************
         */

        this.staticActors.background.colors = BackgroundActor.COLORS_RED;

        for (let i in group) {
            this.states[group[i][0]].pos.x = i*100;
        }

        this.presenter.addSlide("Můžeme začít?", 4, this.states, this.staticActors);


        this._fullMergeSort(group, 0, 0);

        this.staticActors.background.colors = BackgroundActor.COLORS_BLUE;

        this.presenter.addSlide("Děkuji za pozornost.", 4, this.states, this.staticActors);
    }

    _fullMergeSort(group, offset, yoffset) {
        if (group.length > 1) {
            let groups = this._splitToHalf(group, offset, yoffset+100);
            this.presenter.addSlide(null, 1, this.states, this.staticActors);
            groups[0] = this._fullMergeSort(groups[0],offset, yoffset+100);
            groups[1] = this._fullMergeSort(groups[1],offset + 100*groups[0].length + 100, yoffset+100);
            return this._fullMergeOperation(groups[0], groups[1], offset, yoffset, true);
        } else return group;
    }

    _splitToHalf(group, offset, y) {
        let half = Math.round(group.length/2);
        let lgroup = [];
        let rgroup = [];
        for (let i in group) {
            this.states[group[i][0]].pos.x = offset + i*100 + (Number(i)+1>half ? 100 : 0);
            this.states[group[i][0]].pos.y = y;
            if (Number(i)+1>half)
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
    _fullMergeOperation(left, right, xbase, ybase, nocoment=false) {
        let leftPointer = 0;
        let rightPointer = 0;

        let offsetCounter = 0;

        let newGroupRet = []; // return value

        let forTheFirstTime = true;

        while (left.length != leftPointer && right.length != rightPointer) {
            if (!nocoment) {
                this.states[left[leftPointer][0]].stroke = [255, 200, 0];
                this.states[right[rightPointer][0]].stroke = [255, 50, 0];
            }

            let text = "";
            if (left[leftPointer][1] == right[rightPointer][1]) {
                text = "Oba čísla mají stejnou hodnotu " + left[leftPointer][1] + ". To ale nevadí. Protože testujeme <i>je menší, nebo rovno</i>, tak vybereme prvek z levé části.";
            } else {
                text = "Vybereme menší prvek, tedy " + Math.min(left[leftPointer][1], right[rightPointer][1]) + ".";
            }

            text += " Ten přesuneme do slévaného pole.";

            if (nocoment) text = null;

            if (!nocoment || !forTheFirstTime)
                this.presenter.addSlide(text, nocoment ? 0.5 : 4, this.states, this.staticActors);

            forTheFirstTime = false;

            let movingElement ;
            if (left[leftPointer][1] <= right[rightPointer][1]) {
                movingElement = this.states[left[leftPointer][0]];
                newGroupRet.push(left[leftPointer]);
                leftPointer++;
            } else {
                movingElement = this.states[right[rightPointer][0]];
                newGroupRet.push(right[rightPointer]);
                rightPointer++;
            }

            movingElement.pos.y = ybase;
            movingElement.pos.x = xbase + offsetCounter*100;
            offsetCounter++;

            // Number has been moved
        }

        this.presenter.addSlide(nocoment ? null : "Přesunulo se poslední číslo, nyní máme jedno pole prázdné a jedno stále plné. To ale nevadí, jednoduše všechny prvky přesuneme do výsledného pole.", nocoment ? 0.5 : 4, this.states, this.staticActors);

        while (left.length != leftPointer) {
            this.states[left[leftPointer][0]].pos.y = ybase;
            this.states[left[leftPointer][0]].pos.x = xbase + offsetCounter*100;
            newGroupRet.push(left[leftPointer]);
            leftPointer++;
            offsetCounter++
        }

        while (right.length != rightPointer) {
            this.states[right[rightPointer][0]].pos.y = ybase;
            this.states[right[rightPointer][0]].pos.x = xbase + offsetCounter*100;
            newGroupRet.push(right[rightPointer]);
            rightPointer++;
            offsetCounter++
        }

        this.presenter.addSlide(nocoment ? null : "Hotovo, právě jsme spojili dvě pole v jedno, tedy daná funkce merge sortu může skončit...", nocoment ? 0.5 : 4, this.states, this.staticActors);

        return newGroupRet;

    }
}