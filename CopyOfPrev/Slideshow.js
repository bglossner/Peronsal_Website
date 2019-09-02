/**
 * Key: Title
 * Value as list:
 *  [Media link, description, is video, is portrait]
 */

var slideshowObj = {
    "Graph UI" : ["Pics/Thumbnails/graph_gui.PNG", "description", 0, 0],
    "LED Chair" : ["Videos/chroma_video.mp4", "description", 1, 0],
    "Python Calc" : ["Pics/Thumbnails/python-calc.PNG", "description", 0, 0],
    "Java Factor Calc" : ["Pics/Thumbnails/calc2.PNG", "description", 0, 0],
    "Python PDF Maker" : ["Pics/Thumbnails/pdf.png", "description", 0, 1],
    "Python and MySQL" : ["Pics/Thumbnails/py_database.PNG", "description", 0, 1],
    "Connect 4" : ["Pics/Thumbnails/connect4.png", "description", 0, 1],
    "Gesture RC Car" : ["Pics/Thumbnails/car.PNG", "description", 0, 0],
};
var showLength;

function exit(exitElement) {
    let parentEle = exitElement.parentNode;
    if(parentEle != null) {
        parentEle.style.display = "none";
    }
}

var overViewEle, indicatorsEle;
const OVERVIEW_OFFSET = 0;
var curIndex = OVERVIEW_OFFSET;
const timeBet = 750;
const slideMoveBack = 350;
const slideMoveFor = 1000;
const onColor = "darkgreen";
const offColor = "white";
const hoverColor = "yellow";

function goNSlides(n, func, timeSlide) {
    if (n == 0) {
        return;
    }
    else if(n == 1) {
        func();
        return;
    }
    else {
        func();
        setTimeout(() => goNSlides(n - 1, func, timeSlide), timeSlide);
    }
}

function goToSlide(indicator) {
    let index = -1;
    let indicators = document.getElementsByClassName("indicator");
    for(let i = 0; i < indicators.length; i++) {
        if(indicators[i] == indicator) {
            index = i;
            break;
        }
    }
    console.log("Going to slide index: " + index);
    if(curIndex > index) {
        goNSlides(curIndex - index, showBehind, slideMoveBack);
    }
    else if(curIndex < index) {
        goNSlides(index - curIndex, showForward, slideMoveFor);
    }
}

function testKeyPress(e) {
    if (e.keyCode == 39) {
        showForward();
    }
    else if (e.keyCode == 37) {
        showBehind();
    }
}

window.onload = () => {
    const keys = Object.keys(slideshowObj);
    showLength = keys.length;
    let indicatorHolder = document.getElementsByClassName('num-indicator')[0];
    overViewEle = document.getElementsByClassName("overview")[0];
    indicatorsEle = document.getElementsByClassName("num-indicator")[0];
    for (var i in keys) {
        let associatedTitle = keys[i];
        let associatedInfo = slideshowObj[associatedTitle];
        //console.log(associatedTitle + " " + associatedInfo);
        let newIndicator = document.createElement('button');
        newIndicator.className = 'indicator';
        indicatorHolder.appendChild(newIndicator);
        newIndicator.addEventListener("click", () => {
            goToSlide(newIndicator);
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
        newTitle.innerHTML = associatedTitle;
        newHolder.appendChild(newTitle);

        let newPicture = document.createElement('div');
        newPicture.className = 'picture';
        newHolder.appendChild(newPicture);

        if(associatedInfo[2] == 1) {
            newPicture.style.backgroundImage = "none";
            let htmlSrc = `<video autoplay muted loop>
                            <source src="${associatedInfo[0]}" type="video/mp4">Video cannot be displayed!</video>`;
            newPicture.innerHTML = htmlSrc;
        }
        else {
            newPicture.style.backgroundImage = "url('" + associatedInfo[0] + "')";
        }

        if (associatedInfo[3] == 0) {
            newPicture.classList.add("landscape");
        } else {
            newPicture.classList.add("portrait");
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

function goBackSlide(element) {
    if(element.classList.contains("go-back-slide")) {
        element.classList.remove("go-back-slide");
    }
    element.classList.add("go-back-slide");
    /* setTimeout(() => {
        element.classList.add("hide");
    }, 750); */
}

function showDiv(divToShow) {
    if(divToShow.classList.contains("hide")) {
        divToShow.classList.remove("hide");
        divToShow.classList.add("show");
    }
}

function hideDiv(divToHide) {
    //console.log("Hiding diiv");
    if(divToHide.classList.contains("show")) {
        divToHide.classList.remove("show");
        divToHide.classList.add("hide");
    }
}

function goForwardSlide(element) {
    if(element.classList.contains("go-forward-slide")) {
        element.classList.remove("go-forward-slide");
    }
    element.classList.add("go-forward-slide");
}

function getCurrentSlide() {
    return overViewEle.getElementsByClassName('general-holder')[curIndex];
}

function getCurrentIndicator() {
    return indicatorsEle.getElementsByClassName('indicator')[curIndex - OVERVIEW_OFFSET];
}

function setIndicator(newIndex) {
    if (newIndex != curIndex) {
        let cur = getCurrentIndicator();
        cur.style.backgroundColor = offColor;
        indicatorsEle.getElementsByClassName('indicator')[newIndex].style.backgroundColor = onColor;
    }
}

function showBehind() {
    let divToHide = getCurrentSlide();
    setIndicator(curIndex == OVERVIEW_OFFSET ? showLength - 1 : curIndex - 1);
    curIndex -= 1;
    if(curIndex == OVERVIEW_OFFSET - 1) {
        curIndex = showLength - 1 + OVERVIEW_OFFSET;
    }
    let newSlide = getCurrentSlide();
    showDiv(newSlide);
    setTimeout(() => goBackSlide(divToHide), 1);
    setTimeout(() => {
        hideDiv(divToHide);
        divToHide.classList.remove("go-back-slide");
    }, timeBet);
}

function showForward() {
    let divToHide = getCurrentSlide();
    //console.log("Moving forward");
    setIndicator(curIndex == showLength - 1 ? 0 : curIndex + 1);
    curIndex += 1;
    if(curIndex == showLength) {
        curIndex = OVERVIEW_OFFSET;
    }
    let newSlide = getCurrentSlide();
    newSlide.classList.add("rotate");
    showDiv(newSlide);
    setTimeout(() => goForwardSlide(newSlide), 1);
    setTimeout(() => {
        //console.log("Timeout started")
        hideDiv(divToHide);
        newSlide.classList.remove("rotate");
        newSlide.classList.remove("go-forward-slide");
    }, timeBet);
}