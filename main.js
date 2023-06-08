let form = document.querySelector("form");
let birthDay = document.querySelector("#day");
let birthMonth = document.querySelector("#month");
let birthYear = document.querySelector("#year");
let yearAnswerTag = document.querySelector('.answer span[name="years"]');
let monthAnswerTag = document.querySelector('.answer span[name="months"]');
let dayAnswerTag = document.querySelector('.answer span[name="days"]');


let invalidMessage = "Must be a valid #";
let invalidYear = "Must be in the past";
let emptyMessage = "This field is required";
let wholeFormError = "Must be a valid date";
const date = new Date();

let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let yearAnswer = 0;
let monthAnswer = 0;
let dayAnswer = 0;

let dayNum = 0;
let monthNum = 0;
let yearNum = 0;

function calculateAge(){
    let dayOfBirth = parseInt(birthDay.value);
    let monthOfBirth = parseInt(birthMonth.value);
    let yearOfBirth = parseInt(birthYear.value);
    let currentDay = date.getDay();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    
    if(dayOfBirth > currentDay){
        currentDay += (monthDays[currentMonth - 1]);
        currentMonth -= 1
    }

    if(monthOfBirth > currentMonth){
        currentMonth +=  12
        currentYear -= 1;
    }

    dayAnswer = currentDay - dayOfBirth;
    monthAnswer = currentMonth - monthOfBirth;
    yearAnswer = currentYear - yearOfBirth;
}



function showAge(){
     if(yearAnswerTag.innerHTML !== "--"){
        //clear so if another date is put in it doesn't cause an infinite loop
        yearAnswerTag.innerHTML = "--";
        monthAnswerTag.innerHTML = "--";
        dayAnswerTag.innerHTML = "--";
        dayNum = 0;
        monthNum = 0;
        yearNum = 0;
     } 
    

    let dayInterval = setInterval(animate, (2000 / 1997), dayAnswerTag, dayAnswer);
    
    let monthInterval = setInterval(animate, (2000 / 1997), monthAnswerTag, monthAnswer);

    let yearInterval = setInterval(animate, (2000 / 1997), yearAnswerTag, yearAnswer);

    function animate(tag, endNum){
    let currentNumber = 0;
    let intervalName = "";
    
    if(tag.getAttribute("name") == "days"){
            intervalName = dayInterval;
            currentNumber = dayNum;
            dayNum++;
        } else if(tag.getAttribute("name") == "months"){
            intervalName = monthInterval;
            currentNumber = monthNum;
               monthNum++;
        }else{
            intervalName = yearInterval;
            currentNumber = yearNum;
            yearNum++;
        }
    if(currentNumber === endNum){
        clearInterval(intervalName);
    } 
    tag.innerHTML = currentNumber;
    }
}

function showError(tag, errorMessage){
    tag.parentElement.classList.toggle("error")
    tag.nextElementSibling.innerText = errorMessage;
    tag.nextElementSibling.classList.toggle("hide");
}

function validate(){
    let numErrors = 0;
    let validation = false;
    if(birthDay.value.trim() == ""){
        showError(birthDay, emptyMessage);
        numErrors++;
    } else if(birthDay.value < 1 || birthDay.value > 31){
        showError(birthDay, invalidMessage.replace("#", "day"));
        numErrors++;
    }

    if(birthMonth.value.trim() == ""){
        showError(birthMonth, emptyMessage);
        numErrors++;
    } else if(birthMonth.value < 1 || birthMonth.value > 12){
        showError(birthMonth, invalidMessage.replace("#", "month"));
        numErrors++;
    }

    if(birthYear.value.trim() == ""){
        showError(birthYear, emptyMessage);
        numErrors++;
    } else if(birthYear.value > date.getFullYear()){
        showError(birthYear, invalidYear);
        numErrors++;
    }
    if(numErrors == 0){
        //if there aren't any error check if its a valid date
        if(birthDay.value > monthDays[birthMonth.value - 1]){
            showError(birthDay, wholeFormError);
    } else{
        validation = true;
        return validation;
    }
    } else{
        return false;
    }
}


function handleSubmit(event){
    event.preventDefault();
    if(validate()){
        calculateAge();
        showAge();
    }
    
}

form.addEventListener("submit", handleSubmit);
