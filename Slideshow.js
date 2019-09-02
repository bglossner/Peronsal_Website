class Slideshow {
    constructor(indicators, 
        backAnimationClass, frontAnimationClass, rotateAnimationClass, 
        timeBet, forwardMoveTime, backwardMoveTime, setIndicatorFunc, 
        showClass, hideClass,
        list = [], curIndex = 0) {
        this.slides = list;
        this.numSlides = list.length;
        this.curIndex = curIndex;
        this.indicators = indicators;
        this.backAnimationClass = backAnimationClass;
        this.frontAnimationClass = frontAnimationClass;
        this.timeBet = timeBet;
        this.forwardMoveTime = forwardMoveTime;
        this.backwardMoveTime = backwardMoveTime;
        this.showClass = showClass;
        this.hideClass = hideClass;
        this.rotateAnimationClass = rotateAnimationClass;
        this.setIndicatorFunc = setIndicatorFunc;
    }

    getSlides() {
        return this.slides;
    }

    getCurIndex() {
        return this.curIndex;
    }

    getSlide(index) {
        return this.slides[index];
    }

    addSlide(slide) {
        this.slides.push(slide);
        this.numSlides++;
    }

    changeClass(element, oldClass, newClass) {
        if(element.hasClass(oldClass)) {
            element.removeClass(oldClass);
            element.addClass(newClass);
        }
    }

    removeAndAddClass(element, classToEdit) {
        if(element.hasClass(classToEdit)) {
            element.removeClass(classToEdit);
        }
        element.addClass(classToEdit);
    }

    showSlide(element) {
        this.changeClass(element, this.hideClass, this.showClass);
    }

    hideSlide(element) {
        this.changeClass(element, this.showClass, this.hideClass);
    }

    removeOppositeClasses(slide, removal) {
        for(let i = 0; i < removal.length; i++) {
            if (slide.hasClass(removal[i])) {
                slide.removeClass(removal[i]);
            }
        }
    }

    previousSlide() {
        let slideToHide = this.slides[this.curIndex];
        this.setIndicatorFunc(this.curIndex == 0 ? this.numSlides - 1 : this.curIndex - 1);
        this.curIndex -= 1;
        if(this.curIndex == -1) {
            this.curIndex = this.numSlides - 1;
        }
        let newSlide = this.slides[this.curIndex];
        this.removeOppositeClasses(newSlide, [this.frontAnimationClass, this.rotateAnimationClass]);
        this.showSlide(newSlide);
        //setTimeout(() => this.removeAndAddClass(slideToHide, this.backAnimationClass), 1);
        this.removeAndAddClass(slideToHide, this.backAnimationClass);
        setTimeout(() => {
            if (this.slides[this.curIndex] != slideToHide) {
                this.hideSlide(slideToHide);
            }
            slideToHide.removeClass(this.backAnimationClass);
        }, this.timeBet);
    }

    nextSlide() {
        let slideToHide = this.slides[this.curIndex];
        this.setIndicatorFunc(this.curIndex == this.numSlides - 1 ? 0 : this.curIndex + 1);
        this.curIndex += 1;
        if(this.curIndex == this.numSlides) {
            this.curIndex = 0;
        }
        let newSlide = this.slides[this.curIndex];
        this.removeOppositeClasses(newSlide, [this.backAnimationClass, this.rotateAnimationClass, this.frontAnimationClass]);
        newSlide.addClass(this.rotateAnimationClass);
        this.showSlide(newSlide);
        setTimeout(() => this.removeAndAddClass(newSlide, this.frontAnimationClass), 20);
        //this.removeAndAddClass(newSlide, this.frontAnimationClass);
        setTimeout(() => {
            if (this.slides[this.curIndex] != slideToHide) {
                this.hideSlide(slideToHide);
            }
            newSlide.removeClass(this.rotateAnimationClass);
            newSlide.removeClass(this.frontAnimationClass);
        }, this.timeBet);
    }

    goNSlides(n, func, timeSlide) {
        if (n == 0) {
            return;
        }
        else if(n == 1) {
            func();
            return;
        }
        else {
            func();
            setTimeout(() => this.goNSlides(n - 1, func, timeSlide), timeSlide);
        }
    }
    
    goToSlide(indicator) {
        let index = -1;
        let indicators = document.getElementsByClassName("indicator");
        for(let i = 0; i < indicators.length; i++) {
            if(indicators[i] == indicator) {
                index = i;
                break;
            }
        }
        console.log("Going to slide index: " + index);
        if(this.curIndex > index) {
            this.goNSlides(this.curIndex - index, () => this.previousSlide(), this.backwardMoveTime);
        }
        else if(this.curIndex < index) {
            this.goNSlides(index - this.curIndex, () => this.nextSlide(), this.forwardMoveTime);
        }
    }
}