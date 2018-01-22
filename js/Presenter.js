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
        this.animator = new Animator();

    }

    addSlide(text, duration, states, staticActors) {
        staticActors.text.text = text;
        this.slides.push({
            duration: duration,
            states: cloneObject(states),
            staticActors: cloneObject(staticActors)
        });
        this.countOfSlides++;
    }

    destroyAlgorithm() {
        this.countOfSlides = 0;
        if (this.algorithm) {
            this.algorithm.destructor();
            delete this.algorithm;
            this.algorithm = null;
        }
        for (let i in this.slides) {
            delete this.slides[i];
        }
        delete this.slides;
        this.slides = [];

        this.board.textHelpActor.setState({text: null}, true);

        this.isRunning = false;
        this.actualSlide = 0;
        this.playpauseUpdated();
        this.board._updatePlayPauseButton();
    }

    /**
     * @param {Algorithm} alg
     * @param {Array} arr
     */
    initAlgorithm(alg, arr) {
        this.destroyAlgorithm();

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
        this.animator.duration = Presenter.ANIMATION_RATIO_DURATION * this.slides[n].duration * 1000 / this.relativeSpeed;
        for (let i in this.slides[n].states) {
            this.algorithm.children[i].setState(this.slides[n].states[i]);
        }
        for (let i in this.slides[n].staticActors) {
            this.board.staticActors[i].setState(this.slides[n].staticActors[i]);
        }

    }

    playpauseUpdated() {
        clearTimeout(this.timeout);
        if (!this.countOfSlides || !this.isRunning) return;
        this.timeout = setTimeout(()=>this.goToSlide(this.actualSlide + 1), this.slides[this.actualSlide].duration * 1000 / this.relativeSpeed);
    }
}

Presenter.ANIMATION_RATIO_DURATION = 0.25;
