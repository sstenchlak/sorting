class Board {
    constructor () {
        this.animator = new Animator(Board.ANIMATION_DEFAULT_DURATION);
        /**
         * @type {Array.<Actor>} List of all elements, that could be changed during the animation
         */
        this.staticActors = {};

        this.presenter = new Presenter(this);
    }

    /**
     * Something has been updated, neet to change zooming
     */
    updated() {
        let svgw = this.svg.outerWidth()-10;
        let svgh = this.svg.outerHeight()-10;
        let bbox = this.scaleLayer.get(0).getBBox();
        let layw = bbox.width;
        let layh = bbox.height;
        if (!layw) return;
        let scale = Math.min((svgw / layw), (svgh / layh), 3);
        this.scaleLayer.attr('transform', 'translate(' + ((svgw-layw*scale)/2-bbox.x*scale+5) + ',' + ((svgh-layh*scale)/2-bbox.y*scale+5) + ') scale(' + scale + ')');
    }

    // Need to register and initialize all the HTLM elements

    registerSpeedSlider(speedSlider) {
        let min = [0.3, 0.3];
        let max = [10, 3];
        let that = this;
        speedSlider.on('input', function() {
            let x = $(this).val()/1000;
            let val=[1,1];
            if (x>0.5) {
                val[0] = (max[0] - 1)*(x-0.5)/0.5 + 1;
                val[1] = (max[1] - 1)*(x-0.5)/0.5 + 1;
            } else {
                val[0] = (1 - min[0]) * (x) / 0.5 + min[0];
                val[1] = (1 - min[1]) * (x) / 0.5 + min[1];
            }

            that.animator.duration = Board.ANIMATION_DEFAULT_DURATION/val[1];
            that.presenter.relativeSpeed = 1/val[0];

            that.presenter.playpauseUpdated();

        }).trigger('input');
    }

    registerTextContainer(textContainer) {
        // TextHelpActor
        this.textHelpActor = new TextHelpActor(textContainer, this);
        this.staticActors["text"] = this.textHelpActor;
    }

    registerBackgroundElement(background) {
        // BackgroundActor
        this.backgroundActor = new BackgroundActor(background, this);
        this.staticActors["background"] = this.backgroundActor;
    }

    registerSVG(svg) {
        this.svg = svg;
        this.scaleLayer = svg.find('.scale-layer');
    }

    registerPresentationSlider(slider) {
        this._presentationSlider = slider;
        slider.change(()=>{
            this.presenter.goToSlide(Number(slider.val()));
        });
    }

    FastBackward() {
        this.presenter.goToSlide(0);
    }
    Backward() {
        this.presenter.goToSlide(this.presenter.actualSlide-1);
    }

    registerPlayPauseButton(btn) {
        this._playPauseButton = btn;
        btn.click(()=>{
            this.presenter.isRunning = !this.presenter.isRunning;
            this._updatePlayPauseButton();
        });
        this._updatePlayPauseButton();
    }

    _updatePlayPauseButton() {
        this._playPauseButton.find('i').toggleClass('fa-pause', !this.presenter.isRunning).toggleClass('fa-play', this.presenter.isRunning);
        this.presenter.playpauseUpdated();
    }

    Forward() {
        this.presenter.goToSlide(this.presenter.actualSlide+1);
    }

    FastForward() {
        this.presenter.goToSlide(this.presenter.countOfSlides-1);
    }



}

Board.ANIMATION_DEFAULT_DURATION = 500;