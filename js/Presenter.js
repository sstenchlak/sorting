class Presenter {
    constructor() {
        this.relativeSpeed = 1;
        this.isRunning = false;
        this.countOfSlides = 100;
        this.slides = [];
    }
// MUSIS SI TO KOPIROVAT TY STATES
    addSlide(text, duration, states) {
        this.slides.push({
            text: text,
            duration: duration,
            states: states
        })
        this.countOfSlides++;
    }

    removeSlides() {
        this.slides = [];
        this.countOfSlides = 0;
    }
}