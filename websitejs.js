console.log("Start - 1");

/**
 * Anime.js stuff
 */

/* var myAnimation = anime({
    targets: ['.hline'],
    translateX: '-40%',
    delay: function(el, index) {
        return index * 80;
    },
    direction: 'alternate',
    loop: true
}); */

var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
if(check) {
    window.open("mobile.html", "_self");
}

function goToGithub() {
    window.open("https://github.com/bglossner", "_blank");
}

function changeDisp(id, to)
{
    document.getElementById(id).style.display = to;
}

/**
 * Key: Title
 * Value as list:
 *  [Media link, description, is video, is portrait]
 */

var keyphrases = [
    "CSV file", "auto-scales", "LED strip", "Arduino", "HC-05 Bluetooth Module", "protoboard", "circuit",
    "app", "App Inventor", "PEMDAS", "statistical", "infix", "RPN", "GUI", "Java", "libraries", "JFrame",
    "Arbiter", "PDF", "SQL", "MySQL", "tables", "hand-gesture controlled", "RC", "master/slave communication",
    "accelerometer"
]

var basicSlideshowObj = {   
    "Graph UI" : ["Pics/Thumbnails/graph_gui.PNG",
        "This graphing UI allows the user to insert data maunally or with a CSV file. The graph auto-scales and deals with\
        many options for displaying and manipulating the graph.", 0, 0],
    "LED Chair" : ["Videos/chroma_video.mp4", 
        "High school project. Its main feature is to emulate Razer's chroma feature. It uses a Dotstar LED strip, an Arduino Uno, \
        a HC-05 Bluetooth module, and a protoboard. I built a circuit, programmed the Arduino, and developed an app (App Inventor) \
        to control the LED strip from my phone.", 1, 0],
    "Clif Nutrition App" : ["Pics/Thumbnails/powerapps_homepage.png",
        "Microsoft PowerApps was the main platform for app, as it allowed easy database access. It included viewing, creating, and editing items and posts associated with items. Microsoft Flow was used to call stored procedures and, eventually, a custom API I started. <a class=\"dir-link\" href=\"https://drive.google.com/drive/folders/1sd0a3FiddS59nJQqowiQPnsgDtIqFsnf?usp=sharing\" target=\"_blank\">Click here to see pictures!</a>", 0, 1],
    "Clif Database Scripts" : [ "Pics/Thumbnails/sql_server_clif_view.png",
        "I used SSMS in making and using tables, views, and stored procedures in connection with the app. The viewable data in the app is from a view that finds the most recent date for a given updated item allowing backtracing in the actual database (each item update is a new record).", 0, 1],
    "Clif Nutrition API" : [ "Pics/Thumbnails/python_api_difflib_flavor.png",
        "Flask API called with a GET request given a GTIN-12 barcode. It makes a call to upcitemdb API and gathers information on the item from the barcode. Then it uses difflib library\'s SequenceMatcher to find the top 5 matching flavors and brands according to a list of those in text files. This is UNFINISHED." , 0, 1],
    "Python Calc" : ["Pics/Thumbnails/python-calc.PNG", 
        "This calculator has different modes to calculate: expressions in PEMDAS, expressions using the distributive property, \ statistical data, and factors of binomial expressions. It is not done with infix to postfix RPN.", 0, 0],
    "Java Factor Calc" : ["Pics/Thumbnails/calc2.PNG", 
        "Final project in AP CS in high school. This calculator comes with a GUI and factors binomials like a high schooler would using \ common denominators. The GUI is based on Java's basic libraries (JFrame, JButton, actionListener...).", 0, 0],
    "Python PDF Maker" : ["Pics/Thumbnails/pdf.png", 
        "Used for Arbiter to make PDFs from given data. Unfinished but the PDF's format for multiple tests is completely done. Each is \ manually coded to deal with 6 different tests.", 0, 1],
    "Python and MySQL" : ["Pics/Thumbnails/py_database.PNG", 
        "Used for Arbiter to create MySQL tables, as well as alter, delete, and parse those tables (make into a \
        CSV file after).", 0, 1],
    "Connect 4" : ["Pics/Thumbnails/connect4.png", "App Inventor was used to make this app. It includes a ball animation moving donwards \
        and draws the given winning streak. This was made for my old phone so the pixel values are off now.", 0, 1],
    "Gesture RC Car" : ["Pics/Thumbnails/car.PNG", 
        "With help from an Instructable, I created a hand-gesture controlled RC car using two Arduino Unos, a RC car, two \
        HC-05 Bluetooth modules for master/slave communication, and a 6-axis accelerometer.", 0, 0],
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
    if (document.getElementById("display-proj-type").checked) {
        if (e.keyCode == 39) {
            showForward();
        }
        else if (e.keyCode == 37) {
            showBehind();
        }
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

function setupSlideshow() {
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

        let slideKeys = []
        /*for (let phrase of keyphrases) {
            console.log(phrase);
            if (phrase in newDesc) {
                slideKeys.append(phrase);
            }
        }
        console.log(slideKeys);*/

        if (associatedInfo[3] == 0) {
            slideshowObj.addSlide(new Slide(newHolder, newPicture, newTitle, newDesc, associatedTitle, associatedInfo[1],
                associatedInfo[0], "landscape", associatedInfo[2] == 1, false, slideKeys))
        } else {
            slideshowObj.addSlide(new Slide(newHolder, newPicture, newTitle, newDesc, associatedTitle, associatedInfo[1],
                associatedInfo[0], "portrait", associatedInfo[2] == 1, true, slideKeys))
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

function switchClasses(element, name1, name2) {
    if(element.classList.contains(name1)) {
        element.classList.remove(name1);   
    }
    if(element.classList.contains(name2)) {
        element.classList.remove(name2);
    }
    element.classList.add(name2);
}

var pagesInOrder = ["home", "about", "projects", "contact"];
var currentPage = 0;

/*function openPage(page, shouldDo = 1) {
    console.log("ran");
    if(shouldDo == 0) {
        return;
    }
    let pages = document.getElementsByClassName('page');
    for(let element of pages)
    {
        let mainName = element.id.substring(0, element.id.indexOf('page'));
        if(mainName == page)
        {
            console.log(mainName + 'link');
            let linkObj = document.getElementById(mainName + 'link');
            linkObj.style.backgroundColor = "white";
            linkObj.style.color = "hsl(140, 25%, 40%)";
            
            let temp = pagesInOrder.indexOf(mainName);
            if(temp > currentPage) {
                switchClasses(element, "foldPageInLeft", "expandPageOutRight");
            }
            else {
                switchClasses(document.getElementById(currentPage + 'page'), "expandPageOutRight", "foldPageInLeft");
            }
            
            if(page == 'about')
            {
                aboutPageChange();
            }
            
            linkObj = document.getElementById(pagesInOrder[currentPage] + "link");
            linkObj.style.backgroundColor = "hsl(140, 25%, 40%)";
            linkObj.style.color = "white";
            
            currentPage = temp;
        }
    }
}*/

function openPage(page) {
    let pages = document.getElementsByClassName('page');
    for(let element of pages)
    {
        let mainName = element.id.substring(0, element.id.indexOf('page'));
        let linkObj = document.getElementById(mainName + 'link');
        if(mainName == page)
        {
            linkObj.style.backgroundColor = "white";
            linkObj.style.color = "hsl(140, 25%, 40%)";
            element.style.display = "inline-block";
            if(page == 'about')
            {
                aboutPageChange();
            }
        }
        else
        {
            linkObj.style.backgroundColor = "hsl(140, 25%, 40%)";
            linkObj.style.color = "white";
            element.style.display = "none";
        }
    }
}

function unshowModal()
{
    console.log('unshow');
    let modalObj = document.getElementsByClassName('modal-content')[0];
    modalObj.style.animationDirection = "reverse";
    let newObj = modalObj.cloneNode(true);
    modalObj.parentNode.replaceChild(newObj, modalObj);
    setTimeout(() => {
        document.getElementsByClassName('modal')[0].style.display = "none";
    }, 500);
}

function showModal()
{
    document.getElementsByClassName('modal')[0].style.display = "block";
    let modalObj = document.getElementsByClassName('modal-content')[0];
    modalObj.style.animationDirection = "normal";
    let newObj = modalObj.cloneNode(true);
    modalObj.parentNode.replaceChild(newObj, modalObj);
}

function cancelModal()
{
    clearTimeout(modalTimeout);
}

function review(show)
{
    if(show)
    {
        window.open("feedback-form.html", "_blank");
    }

    unshowModal();
}

function toggleSidebar()
{
    let sidebar = document.getElementsByClassName('sidebar')[0];
    let barImg = document.getElementsByClassName('bars')[0];
    let givenWidth = sidebar.offsetWidth;
    //console.log(`Width${sidebar.offsetWidth}a`);
    if(givenWidth != 0)
    {
        sidebar.style.width = 0;
        barImg.style.transform = "rotate(0deg)";
    }
    else
    {
        sidebar.style.width = "10%";
        barImg.style.transform = "rotate(-90deg)";
    }
}

function colorProjectsTable() {
    let tableRows = document.querySelector("#projectspage .basictable").getElementsByTagName("tr");
    for (let i = 1, j = 0; i < tableRows.length; i++, j++) {
        let relatedStyle = window.getComputedStyle(tableRows[i]);
        if (relatedStyle["display"] !== "none") {
            tableRows[i].style.backgroundColor = j % 2 === 0 ? "white" : "rgb(196, 174, 51)";
        }
        else {
            j--;
        }
    }
}

function toggleGeneralProject(linkObj) {
    let parentId = linkObj.parentElement.id;
    let menu = document.getElementsByClassName(parentId.substring(0, parentId.indexOf("-")) + "-specific");
    let arrow = linkObj.getElementsByTagName('img')[0];

    if(menu[0].style.display == "table-row")
    {
        for(let element of menu)
        {
            element.style.display = "none";
        }
        arrow.style.transform = "rotate(0deg)";
        
    }
    else
    {
        for(let element of menu)
        {
            element.style.display = "table-row";
        }
        arrow.style.transform = "rotate(90deg)";
    }
    colorProjectsTable();
}

/*function changeSmallerViews(divObj, first, currView, arrow)
{
    for(let view of currView)
    {
        if(view.style.display == "block")
        {
            view.style.display = "none";
            if(first)
            {
                first = false;
                arrow.style.transform = "rotate(0deg)";
            }
        }
        else
        {
            view.style.display = "block";
            if(first)
            {
                first = false;
                arrow.style.transform = "rotate(90deg)";
            }
        }
    }
}*/

function toggleView(cName)
{
    console.log("VIEW CHANGE")
    let currView = [...document.getElementsByClassName(cName)];
    let arrow = currView[0].parentNode.parentNode.getElementsByClassName("pulldown")[0];
    let divObj = currView[0].parentNode;
    let first = true;
    
    if(divObj.classList.contains('show'))
    {
        divObj.classList.remove('show');
        divObj.classList.add('unshow');
        arrow.style.transform = "rotate(0deg)";
    }
    else
    {
        divObj.classList.remove('unshow');
        divObj.classList.add('show');
        arrow.style.transform = "rotate(90deg)";
    }
    
    let newObj = divObj.cloneNode(true);
    divObj.parentNode.replaceChild(newObj, divObj);
}

function aboutGoto(str)
{
    let parents = ['bio', 'education', 'experience', 'involvement']
    if(!parents.includes(str))
    {
        let child = document.getElementById(str);
        let pars = child.parentNode;
        //console.log(pars.classList);
        if(pars.classList.contains("unshow"))
        {
            //console.log("here");
            //console.log(pars.classList[1]);
            toggleView(child.classList[1]);
            setTimeout(() => {
                window.location.hash = `#${str}`;
            }, 1000);
            return;
        }
    }
    
    window.location.hash = `#${str}`;
    
}

function gotoArea(id)
{
    let pages = ["contactpage", "homepage", "aboutpage", "projectspage"];
    let tmp = document.getElementById(id);
    while(pages.indexOf(tmp.id) == -1)
    {
        tmp = tmp.parentNode;
    }
    
    let pageId = tmp.id;
    openPage(pageId.substring(0, pageId.length - 4));
    window.location.hash = `#${id}`;
    document.getElementById("text_search").value = "";
    hideHits();
}

var firstVisit = true;
function aboutPageChange()
{
    //console.log(firstVisit);
    if(firstVisit)
    {
        //console.log("HI");
        // Compress About me links (except bio)
        toggleView('bio');
        firstVisit = false;
    }
}

var filterChecks = [];
var redWords = [];
var modalTimeout;
window.onload = function() {
    //openPage('home', 0);
    openPage('home');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    let elements = [...document.getElementsByClassName("basictable")[0].getElementsByTagName("tr")];
    for(let element of elements)
    {
        if(element.id)
        {
            filterChecks.push(element);
        }
    }
        
    redWords = getAllRed();
    document.getElementById("projhits").style.display = "none";
    document.getElementById("homehits").style.display = "none";
    scrollTo(0, 0);

    modalTimeout = setTimeout(() => {
        showModal();
    }, 60000);
    /* modalTimeout = setTimeout(() => {
        showModal();
    }, 1000); */
    setupSlideshow();
    colorProjectsTable();
}


var possibleEntries = {
    "projects" : "projectspage",
    "contact info" : "contactpage",
    "about me" : "aboutpage",
    "resume" : "resume", "links" : "aboutpage", "quick links" : "aboutpage",
    "education" : "education",
    "experience" : "experience", "work experience" : "experience", "internships" : "experience",
    "volunteer" : "involvement", "junior samaritans" : "involvement", "leadership" : "involvement",
    "clubs" : "involvement", "app development club" : "involvement", "hack4imapct" : "involvement",
    "community service" : "involvement",
    "age" : "bio", "date of birth" : "bio", "dob" : "bio",
    "languages" : "aboutpage",
    "python" : "projectspage",
    "html" : "projectspage", "HTML/CSS" : "projectspage", "CSS" : "projectspage",
    "JS" : "projectspage", "JavaScript" : "projectspage",
    "MySQL" : "projectspage", "database" : "projectspage",
    "SQL" : "projectspage", "database" : "projectspage",
    "PHP" : "projectspage", "NodeJS" : "aboutpage",
    "IDEs" : "aboutpage", "operating systems" : "aboutpage", "environments" : "projectspage",
    "C" : "projectspage", "Arduino" : "projectspage", "Java" : "projectspage",
    "App Inventor" : "projectspage", "app development" : "projectspage",
    "name" : "aboutpage",
    "home" : "homepage",
    "important" : "important-stuff",
    "email" : "contactpage",
    "github" : "contactpage",
    "phone" : "contactpage",
    "linkedin" : "contactpage",
    "college" : "education", "cal poly" : "education", "graduation date" : "education",
    "class" : "education",
    "feedback form" : "feedback-form", "review" : "feedback-form"
};

function getHomeSearchHits(phrase)
{
    let searches = [];
    for(let key in possibleEntries)
    {
        if(key.substring(0, phrase.length).toLowerCase() == phrase.toLowerCase())
        {
            searches.push(key);
        }
    }

    return searches;
}

function searchEnterHit()
{
    currentText = document.getElementById("text_search").value;
    if(currentText in possibleEntries)
    {
        gotoArea(possibleEntries[currentText]);
    }
    else
    {
        document.getElementById("text_search").value = "";
        hideHits();
        alert("That entry is currently not supported.")
    }
}

var homeHitsShowing = false;
function searchBarKey(event)
{
    if(!event)
    {
        if(document.getElementById("text_search").value.length > 0)
        {
            document.getElementById("homehits").style.display = "block";
        }
        return;
    }
    let x = event.which || event.key;
    let currentText;
    let childNodes = [...document.getElementById("homehits").childNodes];
    if(x == 8)
    {
        //console.log("here");
        let str = document.getElementById("text_search").value;
        currentText = str.substring(0, str.length - 1);
        if(currentText == "")
        {
            for(let element of childNodes)
            {
                element.parentNode.removeChild(element);
            }
            document.getElementById("homehits").style.display = "none";
            homeHitsShowing = false;
        }
    }
    else if(x == 13)
    {
        searchEnterHit();
        return;
    }
    else
    {
        currentText = (document.getElementById("text_search").value + String.fromCharCode(x)).toLowerCase();
    }
    //console.log(currentText);
    if(currentText.length > 0)
    {
        let topHits = getHomeSearchHits(currentText);
        if(!topHits.length)
        {
            homeHitsShowing = false;
            document.getElementById("homehits").style.display = "none";
        }
        else if(!homeHitsShowing && topHits.length > 0)
        {
            homeHitsShowing = true;
            document.getElementById("homehits").style.display = "block";
        }
        
        //console.log(topHits);
        let num = 0;
        for(let hit of topHits)
        {
            let linkObj;
            
            if(num < childNodes.length)
            {
                linkObj = childNodes[num];
            }
            else
            {
                linkObj = document.createElement("a");
                linkObj.className = "projhit";
            }
            
            linkObj.innerHTML = hit;
            linkObj.onclick = function() {
                if(hit in possibleEntries)
                {
                    gotoArea(possibleEntries[hit]);
                }
            };
            document.getElementById("homehits").appendChild(linkObj);
            num++;
        }
        
        for(let i = num; i < childNodes.length; i++)
        {
            childNodes[i].parentNode.removeChild(childNodes[i]);
        }
    }
}

var projSearchFocused = false;
var homeSearchFocused = false;
window.onclick = function(event)
{
    if(document.activeElement === document.getElementById("proj_search"))
    {
        projSearchFocused = true;
    }
    else if(projSearchFocused)
    {
        hideHits();
    }
    else if(document.activeElement === document.getElementById("text_search"))
    {
        homeSearchFocused = true;
    }
    else if(homeSearchFocused)
    {
        hideHits();
    }

    let modal = document.getElementsByClassName('modal')[0];
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

var firstClick = true;
var projectRowsOpen = [];

/* Notation:
    "Langauage" : [All table row ids]
*/
var filterList = {
    "C" : ["arbiter-stuff", "c-files", "led_chair", "car"],
    "PHP" : ["arbiter-stuff", "process-php"],
    "HTML/CSS" : ["graph-ui", "arbiter-stuff", "pmc", "moats"],
    "JavaScript" : ["graph-ui", "arbiter-stuff", "pmc", "moats"],
    "Python" : ["arbiter-stuff", "python-pdf", "pydatabase", "py-projs", "py-calc", "clifbar-stuff", "clifbar-nut-api"],
    "SQL" : ["arbiter-stuff", "c-files", "pydatabase", "clifbar-stuff", "clifbar-sql-server"],
    "Arduino" : ["led_chair", "car"],
    "Java" : ["led_chair", "car", "apps", "java-calc"]
}

// =======================  MAKE ID OBJECT FOR CHECKBOXES ============================
var idList = [];
for(let lang in filterList)
{
    for(let givenId of filterList[lang])
    {
        idList.push(givenId);
    }
    idList = [...new Set(idList)];
}

for(let givenId of idList)
{
    projectRowsOpen[givenId] = 0;
}

// ====================================================================================

// Check all checkboxes
var doingSomething = false;
var toggle = false;
function filterAll()
{
    if(doingSomething)
    {
        alert("Please wait for previous action to finish. Thank you.");
        return;
    }
    doingSomething = true;
    let changeTo = !toggle;
    let filterCheckboxes = document.querySelectorAll('input[type=checkbox]');
    for(let box of filterCheckboxes)
    {
        if(box.parentNode.parentNode.className == "filter-row")
        {
            if(!box.checked && changeTo)
            {
                box.checked = true;
                checkboxChanged(box.id);   
            }
            else if(box.checked && !changeTo)
            {
                box.checked = false;
                checkboxChanged(box.id);
            }
        }
    }
    
    toggle = !toggle;
    doingSomething = false;
}

// Hides all elements of projects table
function resetAllCheckBoxes()
{
    for(let element of filterChecks)
    {
        element.style.display = "none";
    }
}

// Given language filter checkbox has been clicked
function checkboxChanged(name, allHit)
{
    console.log("Resetting checkbox " + name)
    if(firstClick)
    {
        firstClick = false;
        resetAllCheckBoxes();
    }
    
    let objChanged = document.getElementById(name);
    let lang = name.substring(0, name.indexOf("-check"))
    let openChange, displayStyle;
    
    if(objChanged.checked)
    {
        for(let id of filterList[lang])
        {
            projectRowsOpen[id]++;
            document.getElementById(id).style.display = "table-row";
        }
    }
    else
    {
        for(let id of filterList[lang])
        {
            projectRowsOpen[id]--;
            if(!projectRowsOpen[id])
            {
                console.log("Turning " + id + " off")
                document.getElementById(id).style.display = "none";   
            }
        }
    }
}

// Get all the red words in the projects
function getAllRed()
{
    let tableSpans = document.getElementsByClassName("keyphrase");
    let keyphrases = [];
    let notIn = ["and", "a", "\n", "in"];
    
    for(let span of tableSpans)
    {
        let words = span.innerHTML.split(" ");
        if(words.length > 0)
        {
            for(let word of words)
            {
                if((word != "") && (notIn.indexOf(word) == -1))
                {
                    keyphrases.push(word);
                }
            }
        }
        keyphrases.push(span.innerHTML.trim());
        
        keyphrases = [...new Set(keyphrases)];
    }

    return keyphrases;
}

var highlighted = [];
function getProjsFromPhrase(phrase, edit)
{
    let projs = [];
    let numResults = 0;
    let unwantedSearches = ["<span class=\"keyphrase\">", "<\/span>", "<a class=\"dir-link\" href=\"Projects\/PDF%20Files\/\" target=\"_blank\">", "<\/a>",
            "<a class=\"dir-link\" href=\"https:\/\/drive.google.com\/drive\/folders\/1TLm0B9KWKzvkIqJ3-AO5GPiYWPNwY1vB?usp=sharing\" target=\"_blank\">",
            "<a class=\"dir-link\" href=\"https:\/\/drive.google.com\/drive\/folders\/1GjoeMmMCFYjtJdg5ZrnsxklLvLSdplXs?usp=sharing\" target=\"_blank\">",
            "<a class=\"dir-link\" href=\"https:\/\/drive.google.com\/drive\/folders\/1xohV4s2-FXRgEdiB6JXxJt3xJ6ZUDXra?usp=sharing\" target=\"_blank\">",
            "<a class=\"dir-link\" href=\"https:\/\/drive.google.com\/drive\/folders\/1sd0a3FiddS59nJQqowiQPnsgDtIqFsnf?usp=sharing\" target=\"_blank\">",
            "<a class=\"dir-link\" href=\"https:\/\/drive.google.com\/drive\/folders\/1QefSAMX_Q9dNXx2kRESiVpNYZ-T0uIkG?usp=sharing\" target=\"_blank\">"];
    for(let proj of filterChecks)
    {
        let desc = proj.getElementsByClassName("projdesc")[0].innerHTML;
        let i = 0;
        for(let search of unwantedSearches)
        {
            i++;
            if(i < 5) {
                desc = desc.replace(new RegExp(search, 'g'), `INS${i}`);
            }
            else {
                desc = desc.replace(search, `INS${i}`);
            }
        }
        let firstIndex = desc.indexOf(phrase);
        if(firstIndex > -1)
        {
            numResults += desc.split(phrase).length - 1;
            //console.log(numResults);
            desc = desc.replace(new RegExp(phrase, 'g'), `<span class="highlight">${phrase}</span>`);
        }
        
        i = 0;
        for(let search of unwantedSearches)
        {
            i++;
            desc = desc.replace(new RegExp(`INS${i}`, 'g'), search);
        }
        
        if(firstIndex >= 0)
        {
            projs.push(proj);
            if(edit)
            {
                highlighted.push(proj.id);
                document.getElementById(proj.id).getElementsByClassName("projdesc")[0].innerHTML = desc;
            }
        }
    }
    
    return [projs, numResults];
}

function unhighlight()
{
    for(let id of highlighted)
    {
        let initial = document.getElementById(id).getElementsByClassName("projdesc")[0].innerHTML;
        let firstIndex = initial.indexOf("<span class=\"highlight\">");
        while(firstIndex > -1)
        {
            initial = initial.replace("<span class=\"highlight\">", "");
            let sub = initial.substring(firstIndex, initial.length);
            sub = sub.replace("</span>", "");
            initial = initial.substring(0, firstIndex) + sub;
            firstIndex = initial.indexOf("<span class=\"highlight\">"); 
        }
        
        document.getElementById(id).getElementsByClassName("projdesc")[0].innerHTML = initial;
    }
    highlighted = [];
}

function getAllItems(arr, val) {
    let things = [];
    for(let str of arr)
    {
        if((str.substring(0, val.length)).toLowerCase() === val.toLocaleLowerCase())
        {
            things.push(str);
        }
    }
    
    return things;
}

function getTopHitsProjs(currentText)
{
    let hits = getAllItems(redWords, currentText);
    hits.sort(function(a, b) {
        return a.length - b.length;
    });
    
    let topHits = [];
    for(let i = 0; (i < 5) && (i < hits.length); i++)
    {
        topHits.push(hits[i]);
    }
    
    return topHits;
}

function hideHits(event)
{
    document.getElementById("projhits").style.display = "none";
    changeDisp("homehits", "none");
    hitsShowing = false;
    homeHitsShowing = false;
}

var hitsShowing = false;
function setUpProjHits(event)
{
    if(!event)
    {
        if(document.getElementById("proj_search").value.length > 0)
        {
            document.getElementById("projhits").style.display = "block";
        }
        return;
    }
    let x = event.which || event.key;
    let currentText;
    let childNodes = [...document.getElementById("projhits").childNodes];
    if(x == 8)
    {
        let str = document.getElementById("proj_search").value;
        currentText = str.substring(0, str.length - 1);
        if(currentText == "")
        {
            for(let element of childNodes)
            {
                element.parentNode.removeChild(element);
            }
            document.getElementById("projhits").style.display = "none";
            hitsShowing = false;
        }
    }
    else if(x == 13)
    {
        keyphraseProjFilter(document.getElementById("proj_search").value);
        return;
    }
    else
    {
        currentText = (document.getElementById("proj_search").value + String.fromCharCode(x)).toLowerCase();
    }
    //console.log(currentText);
    if(currentText.length > 0)
    {
        let topHits = getTopHitsProjs(currentText);
        if(!topHits.length)
        {
            hitsShowing = false;
            document.getElementById("projhits").style.display = "none";
        }
        else if(!hitsShowing && topHits.length > 0)
        {
            hitsShowing = true;
            document.getElementById("projhits").style.display = "block";
        }
        
        //console.log(topHits);
        let num = 0;
        for(let hit of topHits)
        {
            let linkObj;
            
            if(num < childNodes.length)
            {
                linkObj = childNodes[num];
            }
            else
            {
                linkObj = document.createElement("a");
                linkObj.className = "projhit";
            }
            
            linkObj.innerHTML = hit;
            linkObj.onclick = function() {
                keyphraseProjFilter(hit);
            };
            document.getElementById("projhits").appendChild(linkObj);
            num++;
        }
        
        for(let i = num; i < childNodes.length; i++)
        {
            childNodes[i].parentNode.removeChild(childNodes[i]);
        }
    }
}

function sayHi() {
    alert("hi");
}

function resetProjHTML()
{
    console.log("Resetting HTML");
    document.getElementById("search-result").innerHTML = "";
    unhighlight();
}

function resetProjSearchBar()
{
    document.getElementById("proj_search").value = "";
    hideHits();
}

function keyphraseProjFilter(keyphrase)
{
    if(keyphrase === "") {
        resetProjHTML();
        return;
    }
    resetAllCheckBoxes();
    resetProjHTML();
    //console.log(keyphrase);
    let retVal = getProjsFromPhrase(keyphrase, true);
    let projs = retVal[0];
    let numResults = retVal[1];
    for(let element of filterChecks)
    {
        if(projs.indexOf(element) > -1)
        {
            changeDisp(element.id, "table-row");
        }
        else
        {
            changeDisp(element.id, "none");
        }
    }
    
    document.getElementById("search-result").innerHTML = `Showing ${numResults} results for "${keyphrase}"`
    resetProjSearchBar();
}

var onVideo = false;
function showImageOnHover(src, isVideo = false, videoSource = null)
{
    let imgShower = document.getElementById('image-shower');
    onVideo = isVideo ? true : false;
    if(onVideo) {
        imgShower.style.backgroundImage = "none";
        let htmlSrc = `<video autoplay muted loop>
                        <source src="${videoSource}" type="video/mp4">
                        Video cannot be displayed!
                    </video>`;
        imgShower.innerHTML = htmlSrc;
    }
    else {
        imgShower.innerHTML = "";
        //document.getElementById("in-image-shower").src = src;
        imgShower.style.backgroundImage = `url(${src})`;
        //document.getElementById("image-shower").style.transform = "translate(-30vh, -30vh)";
    }
    changeDisp("image-shower", "block");
}

function hideImageShower() {
    if(onVideo) {
        onVideo = false;
        document.getElementById('image-shower').innerHTML = "";
    }
    changeDisp("image-shower", "none");
    //document.getElementById("image-shower").style.transform = "translate(30vh, 30vh)";
}

function projTypeSwitch() {
    if (document.getElementById("display-proj-type").checked) {
        document.getElementsByClassName("basictable")[0].style.display = "none";
        document.getElementsByClassName("overview")[0].style.display = "block";
        document.querySelector("#projectspage .filter-section").style.display = "none";
        document.querySelector("#whole-search").style.display = "none";
    }
    else {
        document.getElementsByClassName("basictable")[0].style.display = "block";
        document.getElementsByClassName("overview")[0].style.display = "none";
        document.querySelector("#projectspage .filter-section").style.display = "block";
        document.querySelector("#whole-search").style.display = "block";
    }
}

function getMyAge(date_born) {
}