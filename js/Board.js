class Board {
    constructor () {
        this.animator = new Animator(Board.ANIMATION_DEFAULT_DURATION);
        /**
         * @type {Array.<Actor>} List of all elements, that could be changed during the animation
         */
        this.staticChildren = [];
        this.children = [];

        this.presenter = new Presenter();
    }

    /**
     * Something has been updated, neet to change zooming
     */
    updated() {
        let svgw = this.svg.outerWidth();
        let svgh = this.svg.outerHeight();
        let bbox = this.scaleLayer.get(0).getBBox();
        let layw = bbox.width;
        let layh = bbox.height;
        if (!layw) return;
        let scale = Math.min((svgw / layw), (svgh / layh));
        this.scaleLayer.attr('transform', 'translate(' + ((svgw-layw*scale)/2-bbox.x*scale) + ',' + ((svgh-layh*scale)/2-bbox.y*scale) + ') scale(' + scale + ')');
    }

    // Need to register and initialize all the HTLM elements

    registerSpeedSlider(speedSlider) {
        let min = 0.3;
        let max = 10;
        let that = this;
        speedSlider.on('input', function() {
            let x = $(this).val()/1000;
            let val=1;
            if (x>0.5) {
                val = (max - 1)*(x-0.5)/0.5 + 1;
            } else {
                val = (1 - min) * (x) / 0.5 + min;
            }

            that.animator.duration = Board.ANIMATION_DEFAULT_DURATION/val;
            that.presenter.relativeSpeed = 1/val;

        }).trigger('input');
    }

    registerTextContainer(textContainer) {
        // TextHelpActor
        this.textHelpActor = new TextHelpActor(textContainer, this);
        this.staticChildren.push(this.textHelpActor);
    }

    registerBackgroundElement(background) {
        // BackgroundActor
        this.backgroundActor = new BackgroundActor(background, this);
        this.staticChildren.push(this.backgroundActor);
    }

    registerSVG(svg) {
        this.svg = svg;
        this.scaleLayer = svg.find('.scale-layer');
    }

    registerPresentationSlider(slider) {
        this._presentationSlider = slider;
    }

    FastBackward() {
        this._presentationSlider.val(1);
    }
    Backward() {
        this._presentationSlider.val(Number(this._presentationSlider.val())-1);
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
    }

    Forward(btn) {
        this._presentationSlider.val(Number(this._presentationSlider.val())+1);
    }

    FastForward(btn) {
        this._presentationSlider.val(this.presenter.countOfSlides);
    }



}

Board.ANIMATION_DEFAULT_DURATION = 1000;