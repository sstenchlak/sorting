class MainMenu {
    /**
     * @returns {Array.<Algorithm>}
     */
    static getListOfAlgorithms() {
        return [
            BubleSortAlgorithm,
            InsertionSortAlgorithm,
            MergeSortAlgorithm
        ]
    }

    constructor(menuelement, callbackSelected) {
        this.menuelement = menuelement;
        this.mainmenu = menuelement.find('.mainmenu');
        this.numbermenu = menuelement.find('.numbermenu');
        this.callbackSelected = callbackSelected;

        for (let i in MainMenu.getListOfAlgorithms()) {
            let alg = this.mainmenu.find('.ref').clone().toggleClass('ref').css('display', 'block').appendTo(this.mainmenu);
            alg.find('.title').text(MainMenu.getListOfAlgorithms()[i].getName());
            alg.find('.description').text(MainMenu.getListOfAlgorithms()[i].getDescription());
            alg.find('.start').click(()=>{
                this.selected(MainMenu.getListOfAlgorithms()[i]);
            });
        }

        this.numbermenu.find('.back').click(()=>{
            this.numbermenu.fadeOut(400, ()=>{
                this.mainmenu.fadeIn(400);
            });
        });

        this.numbermenu.find('.run').click(()=>{ this.run(); });

        this.mainmenu.css('display', 'block');
        menuelement.fadeIn();
    }

    openMenu(){
        this.mainmenu.css('display', 'block');
        this.numbermenu.css('display', 'none');
        this.menuelement.fadeIn();
    }

    closeMenu() {
        this.menuelement.fadeOut();
    }

    selected (alg) {
        this.selectedAlgorithm = alg;
        this.numbermenu.find('.title').text(alg.getName());
        this.numbermenu.find('.numbers').val(generateRandomNumbers().join(' '));
        this.mainmenu.fadeOut(400, ()=>{
            this.numbermenu.fadeIn(400, ()=>{
                this.numbermenu.find('.numbers').focus();
            });
        });
    }

    run () {
        // Parse textarea
        let out = this.numbermenu.find('.numbers').val().split(' ');
        let arr = [];
        for (let i in out) {
            if (out[i].length && !isNaN(Number(out[i]))) {
                arr.push(Number(out[i]));
            }
        }

        if (arr.length < 5) return;

        this.closeMenu();

        this.callbackSelected(this.selectedAlgorithm, arr);
    }
}