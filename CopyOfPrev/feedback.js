console.log("Feedback JS started");
console.log("testhdg");

function hideSpec(id)
{
    document.getElementById('spec').value = "";
    document.getElementById('spec').style.display = "none";
}

var oneOn = false;
function quesHover(obj)
{
    if(oneOn)
    {
        return;   
    }
    let children = obj.childNodes;
    children[1].classList.toggle('show');
    oneOn = true;
    
    setTimeout(() => {
        children[1].classList.toggle('show');
        oneOn = false;
    }, 3500);
}

var currCheck = null;

window.onload = function() {
    currCheck = document.getElementById("perf");
    document.body.scrollTop = 0;
};

function radioHit(obj)
{
    currCheck.checked = false;
    currCheck = obj;
    
    if(currCheck.id == "perf")
    {
        document.getElementById('places').style.display = "none";
        document.getElementById('place-table').style.display = "none";
    }
    else
    {
        document.getElementById('places').style.display = "block";
        document.getElementById('place-table').style.display = "block";
    }
}

function pressed(val, event)
{
    let x = event.which || event.key;
    if(x == 13)
    {
        event.preventDefault();
        document.activeElement.blur();
    }
    return false;
}

function openSpec()
{
    let spec = document.getElementById('spec');
    spec.style.display = "inline-block";
    document.activeElement.blur();
    spec.focus();
}

function specBlurred(val)
{
    let notificationPanel = document.getElementById('notification');
    let currVal = document.getElementById('place-selector').value;
    document.getElementById('place-selector').value = "Everywhere";
    if(val.length == 0)
    {
        notificationPanel.style.display = "block";
        notificationPanel.innerHTML = "Please fill out the 'Where Exactly?' textbox!"
        document.getElementById('spec').focus();
        return;
    }
    else
    {
        notificationPanel.style.display = "none";
        if(val.length > 12)
        {
            val = val.substring(0, 13);
        }
        newPlace(currVal, val);
        hideSpec('spec');   
    }
    
    
    return false;
}

var first = true;
var rowNum = 1;
function newPlace(placeName, specName)
{
    /*if(first)
    {
        document.getElementsByClassName('place-row')[0].style.display = "block";
        first = false;
    }*/
    
    console.log(placeName);
    let tablePlace = document.getElementById('place-table');
    
    let newObj = document.createElement('div');
    newObj.classList.add('place-row');
    newObj.id = `row${rowNum++}`;
    
    let deleteElement = document.createElement('a');
    deleteElement.classList.add('delete');
    deleteElement.innerHTML = 'X';
    deleteElement.onclick = () => {
        tablePlace.removeChild(newObj);
        /*let curr = tablePlace.getElementsByClassName('place-row');
        if(curr.length == 1)
        {
            curr[0].style.display = "none";
            first = true;
        }*/
    };
    newObj.appendChild(deleteElement);
    
    let nameElement = document.createElement('p');
    nameElement.innerHTML = placeName;
    newObj.appendChild(nameElement);
    
    let nameElement2 = document.createElement('p');
    nameElement2.innerHTML = specName;
    newObj.appendChild(nameElement2);
    
    let reasonDiv = document.createElement('div');
    reasonDiv.classList.add('reason-div');
    let labelElement = document.createElement('label');
    labelElement.innerHTML = "Error/Problem:";
    labelElement.classList.add('margin-right');
    reasonDiv.appendChild(labelElement);
    let selectionElement = document.createElement('select');
    let appendElements = ["Design", "Functionality", "Bug", "Scaling", "Aesthetics", "Everything"];
    for(let element of appendElements)
    {
        let optionElement = document.createElement('option');
        optionElement.value = element;
        optionElement.innerHTML = element;
        selectionElement.appendChild(optionElement);
    }
    reasonDiv.appendChild(selectionElement);
    newObj.appendChild(reasonDiv);
    
    let moreElement = document.createElement('button');
    moreElement.innerHTML = "Provide More";
    moreElement.type = "button";
    moreElement.title = "OPTIONAL";
    moreElement.onclick = () => {
        currentEdit = newObj.id;
        resetAddInfoText();
        if(currentEdit in responses)
        {
            document.getElementById('add-info-text').value = responses[currentEdit];
        }
        document.getElementById('additional-info').style.display = "block";
        document.getElementById('add-info-text').focus();
    };
    newObj.appendChild(moreElement);
    
    tablePlace.appendChild(newObj);
}

function resetAddInfoText()
{
    document.getElementById('additional-info').style.display = "none";
    document.getElementById('add-info-text').value = "";
}

var currentEdit;
var responses = {};
function addInfoSubmit()
{
    let imgElement = document.createElement('img');
    imgElement.src = "checkmark.png";
    imgElement.classList.add('check-img');
    document.getElementById(currentEdit).getElementsByTagName('button')[0].appendChild(imgElement);
    responses[currentEdit] = document.getElementById('add-info-text').value;
    resetAddInfoText();
}

function addInfoCancel()
{
    resetAddInfoText();
}

function phpPart(objToSend)
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/feedback_form.php", true);
    httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpc.setRequestHeader("Content-Length", Object.keys(objToSend).length);
    
    xmlhttp.send(objToSend);
}

function checkValidData()
{
    if(currCheck.id != "perf")
    {
        if((document.getElementById('place-selector').value != "everywhere") && (document.getElementsByClassName('place-row').length == 0))
        {
            alert("Please fill out one area that is a problem in your opinion.");
            return false;
        }
    }

    let emailObj = document.getElementsByName('email')[0];
    if(emailObj.value != '')
    {
        //console.log(emailObj.value);
        let validPattern = /^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/.test(emailObj.value);
        if(!validPattern)
        {
            alert("Please enter a valid email address!")
            return false;
        }
    }

    let firstnameObj = document.getElementsByName('firstname')[0];
    let lastnameObj = document.getElementsByName('lastname')[0];
    let nameRegex = /^[A-Za-z]{1,32}$/;
    if(firstnameObj.value != '')
    {
        let validPattern = nameRegex.test(firstnameObj.value);
        if(!validPattern)
        {
            alert('Please enter a valid firstname!');
            return false;
        }
    }
    if(lastnameObj.value != '')
    {
        let validPattern = nameRegex.test(lastnameObj.value);
        if(!validPattern)
        {
            alert('Please enter a valid lastname!');
            return false;
        }
    }
    
    return true;
}

var in_php = false;
function afterPhpProcessing(success)
{
    if(!in_php)
    {
        in_php = true;
        if(success)
        {
            window.open('feedback_response.html', "_self");
        }
        else
        {
            alert("Unforutnately there was an error in the submission process. Please contact benglossner@gmail.com to notify me of the error. Sorry for the inconvenience.")
        }
    }
}

function phpPart(obj)
{
    var http = new XMLHttpRequest();
    var url = 'feedback_process.php';

    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            afterPhpProcessing(true);
        }
        /*else {
            afterPhpProcessing(false);
        }*/
    }
    http.send(JSON.stringify(obj));
}

function formSubmission()
{
    console.log("entered form submission");
    let c = confirm("Are you sure you'd like to submit this form now?");
    
    if(!c) {return;}
    
    if(!checkValidData()) {return;}
    
    let objToSend = {};
    
    let largeTexts = document.getElementsByClassName('larger-text');
    for(let text of largeTexts)
    {
        objToSend[text.name] = text.value;
    }
    
    objToSend["comments"] = document.getElementById('comments').value;
    
    let radioSub = currCheck.value;
    objToSend["rating"] = radioSub;
    
    if(radioSub != "perfect")
    {
        let placeRows = document.getElementsByClassName('place-row');
        let i = 0;
        for(let row of placeRows)
        {
            let rowObj = {};
            let children = row.childNodes;
            rowObj["place"] = children[1].innerHTML;
            rowObj["place-desc"] = children[2].innerHTML;
            rowObj["problem"] = children[3].getElementsByTagName('select')[0].value;
            if(row.id in responses)
            {
                rowObj["add-comments"] = responses[row.id];
            }
            else
            {
                rowObj["add-comments"] = "";
            }
            
            objToSend[`placeRow${i++}`] = rowObj;
        }
        
        objToSend['numPlaces'] = i;
    }
    
    //console.log(objToSend);
    phpPart(objToSend);
}