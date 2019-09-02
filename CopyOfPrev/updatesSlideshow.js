/**
 * Key: Title
 * Value as list:
 *  [Media link, description, is video, is portrait]
 */

var basicSlideshowObj = {
    "Graph UI" : ["Pics/Thumbnails/graph_gui.PNG", "description", 0, 0],
    "LED Chair" : ["Videos/chroma_video.mp4", "description", 1, 0],
    "Python Calc" : ["Pics/Thumbnails/python-calc.PNG", "description", 0, 0],
    "Java Factor Calc" : ["Pics/Thumbnails/calc2.PNG", "description", 0, 0],
    "Python PDF Maker" : ["Pics/Thumbnails/pdf.png", "description", 0, 1],
    "Python and MySQL" : ["Pics/Thumbnails/py_database.PNG", "description", 0, 1],
    "Connect 4" : ["Pics/Thumbnails/connect4.png", "description", 0, 1],
    "Gesture RC Car" : ["Pics/Thumbnails/car.PNG", "description", 0, 0],
};

var slideshowObj;

var showLength;

/**
 * Exits slideshow
 * @param {HTMLElement} exitElement - exits slideshow 
 */
function exit(exitElement) {
    let parentEle = exitElement.parentNode;
    if(parentEle != null) {
        parentEle.style.display = "none";
    }
}

var overViewEle, indicatorsEle;
const OVERVIEW_OFFSET = 0;
const timeBet = 750; /* This is the time in between a slide starting to animate and finishing animating (a rotation) */
const slideMoveBack = 250; /* This is the time to take before going to the PREV slide if its auto-moving */
const slideMoveFor = 250; /* Same as above but time to NEXT */
const onColor = "darkgreen"; /* Color for indicator to turn when on that slide */
const offColor = "white"; /* Color for indicator when not on that slide */
const hoverColor = "yellow"; /* Color for indicator when slide is being hovered over and isn't active slide */


/**
 * If arrow key passed in, it will move slides
 * 39 = -> keypress
 * 37 = <- keypress
 * @param {Key} e - keyevent
 */
function testKeyPress(e) {
    if (e.keyCode == 39) {
        showForward();
    }
    else if (e.keyCode == 37) {
        showBehind();
    }
}

function setIndicator(newIndex) {
    if (newIndex != slideshowObj.curIndex) {
        let cur = indicatorsEle.getElementsByClassName('indicator')[slideshowObj.curIndex - OVERVIEW_OFFSET];
        cur.style.backgroundColor = offColor;
        indicatorsEle.getElementsByClassName('indicator')[newIndex].style.backgroundColor = onColor;
    }
}

function showBehind() {
    slideshowObj.previousSlide();
}

function showForward() {
    slideshowObj.nextSlide();
}

window.onload = () => {
    const keys = Object.keys(basicSlideshowObj);
    showLength = keys.length;
    let indicatorHolder = document.getElementsByClassName('num-indicator')[0];
    overViewEle = document.getElementsByClassName("overview")[0];
    indicatorsEle = document.getElementsByClassName("num-indicator")[0];
    slideshowObj = new Slideshow(indicatorsEle, "go-back-slide", "go-forward-slide", "rotate", timeBet, 
        slideMoveFor, slideMoveBack, setIndicator, "show", "hide");
    for (var i in keys) {
        let associatedTitle = keys[i];
        let associatedInfo = basicSlideshowObj[associatedTitle];
        //console.log(associatedTitle + " " + associatedInfo);
        let newIndicator = document.createElement('button');
        newIndicator.className = 'indicator';
        indicatorHolder.appendChild(newIndicator);
        newIndicator.addEventListener("click", () => {
            slideshowObj.goToSlide(newIndicator);
        });
        newIndicator.addEventListener("mouseenter", () => {
            if (newIndicator.style.backgroundColor != onColor) {
                newIndicator.style.backgroundColor = hoverColor;
            }
        });
        newIndicator.addEventListener("mouseleave", () => {
            if (newIndicator.style.backgroundColor == hoverColor) {
                newIndicator.style.backgroundColor = offColor;
            }
        });
        
        let newHolder = document.createElement('div');
        newHolder.className = 'hide general-holder';
        
        let newTitle = document.createElement('a');
        newTitle.className = 'pic-title';
        newHolder.appendChild(newTitle);

        let newPicture = document.createElement('div');
        newPicture.className = 'picture';
        newHolder.appendChild(newPicture);

        let newDesc = document.createElement('p');
        newDesc.className = 'description';
        newHolder.append(newDesc);

        if (associatedInfo[3] == 0) {
            slideshowObj.addSlide(new Slide(newHolder, newPicture, newTitle, newDesc, associatedTitle, associatedInfo[1],
                associatedInfo[0], "landscape", associatedInfo[2] == 1, false))
        } else {
            slideshowObj.addSlide(new Slide(newHolder, newPicture, newTitle, newDesc, associatedTitle, associatedInfo[1],
                associatedInfo[0], "portrait", associatedInfo[2] == 1, true))
        }

        overViewEle.appendChild(newHolder);
        i++;
    }
    
    window.addEventListener("keydown", testKeyPress, false);

    if(i > 0) {
        overViewEle.getElementsByClassName('general-holder')[OVERVIEW_OFFSET].classList.remove("hide");
        overViewEle.getElementsByClassName('general-holder')[OVERVIEW_OFFSET].classList.add("show");
        indicatorsEle.getElementsByClassName('indicator')[0].style.backgroundColor = "darkgreen";
    }
}