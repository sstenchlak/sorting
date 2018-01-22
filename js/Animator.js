class Animator {
    constructor(duration){
        this.duration = duration;
    }

    animate(callback, durationRatio = 1) {
        let step = {val: 0};
        jQuery(step).animate({val: 1}, {
            duration: this.duration * durationRatio,
            easing: 'swing',
            step: () => callback(step.val),
            done: () => callback(1),
        });
    }
}