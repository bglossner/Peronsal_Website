class Slide {
    constructor(parentEle, pictureEle, titleEle, descEle, 
        title, description, link, orientationClass,
        isVideo, isPortrait, keywords = [], keywordClass = null, width = -1, height = -1) {
        this.title = title;
        this.description = description;
        this.link = link;
        this.isVideo = isVideo;
        this.isPortrait = isPortrait;
        this.width = width;
        this.height = height;
        this.parentEle = parentEle;
        this.pictureEle = pictureEle;
        this.titleEle = titleEle;
        this.descEle = descEle;

        this.titleEle.innerHTML = title;
        if(isVideo) {
            pictureEle.style.backgroundImage = "none";
            let htmlSrc = `<video autoplay muted loop>
                            <source src="${link}" type="video/mp4">Video cannot be displayed!</video>`;
            pictureEle.innerHTML = htmlSrc;
        }
        else {
            pictureEle.style.backgroundImage = "url('" + link + "')";
        }

        pictureEle.classList.add(orientationClass);

        

        descEle.innerHTML = description;
    }

    addClass(classToAdd) {
        this.parentEle.classList.add(classToAdd);
    }

    hasClass(classToTest) {
        return this.parentEle.classList.contains(classToTest);
    }

    removeClass(classToRemove) {
        this.parentEle.classList.remove(classToRemove);
    }
}