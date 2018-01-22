class Presenter {
    constructor(board) {
        this.relativeSpeed = 1;
        this.isRunning = false;
        this.countOfSlides = 0;
        this.slides = [];
        this.actualSlide = 0;
        this.algrorithm = null;
        this.board = board;
        this.timeout = null;
    }

    addSlide(text, duration, states, staticActors) {
        staticActors.text.text = text;
        this.slides.push({
            //text: text,
            duration: duration,
            states: cloneObject(states),
            staticActors: cloneObject(staticActors)
        });
        this.countOfSlides++;
    }

    removeSlides() {
        this.slides = [];
        this.countOfSlides = 0;
    }

    /**
     * @param {Algorithm} alg
     * @param {Array} arr
     */
    initAlgorithm(alg, arr) {
        this.removeSlides();
        this.algorithm = new alg();
        this.algorithm.prepare(arr, this.board, this);

        this.board._presentationSlider.attr('max', this.countOfSlides);
        this.board.FastBackward();

        this.isRunning = true;
        this.board._updatePlayPauseButton();

        this.playpauseUpdated();
    }

    goToSlide(n) {
        if (n < 0) n = 0;
        if (n >= this.countOfSlides) n = this.countOfSlides-1;
        this.actualSlide = n;
        this.board._presentationSlider.val(n);
        this.drawSlide(n);
        this.playpauseUpdated();
    }

    drawSlide(n) {
        for (let i in this.slides[n].states) {
            this.algorithm.children[i].setState(this.slides[n].states[i]);
        }
        for (let i in this.slides[n].staticActors) {
            this.board.staticActors[i].setState(this.slides[n].staticActors[i]);
        }
        /*this.board.backgroundActor.setState(this.slides[n].staticActors.backgroud);
        this.board.textHelpActor.setState({text: this.slides[n].text});*/
    }

    playpauseUpdated() {
        clearTimeout(this.timeout);
        if (!this.countOfSlides || !this.isRunning) return;
        this.timeout = setTimeout(()=>this.goToSlide(this.actualSlide + 1), this.slides[this.actualSlide].duration * 1000 * this.relativeSpeed);
    }
}