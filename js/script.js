console.log("Hello!")
// HTML DOM querySelector Method(), grabbing from the index.html file for needed elements
const start_button = document.querySelector(".start_button button");
const information_container = document.querySelector(".information_container");
const bye_button = information_container.querySelector(".buttons .withdraw");
const proceed_button = information_container.querySelector(".buttons .reset");
const question_container = document.querySelector(".question_container");
const score_container = document.querySelector(".score_container");
const choice_select = document.querySelector(".choice_select");
const ticker_text = document.querySelector(".countdown .countdown_text");
const tickerDown = document.querySelector(".countdown .countdown_seconds");

// When the start_button is clicked on, this will show the information_container div
// .add("initiateInformation") to start quiz. "Ready?" button will be activated, from style.css line 29
start_button.onclick = ()=>{
    information_container.classList.add("initiateInformation"); 
}

// When the bye_button is clicked on, this will hide the information_container div
// "I change my mind" This goes back to the "Ready?" button, hides the container with the instructions that also displays the "Let's Go!" button
bye_button.onclick = ()=>{
    information_container.classList.remove("initiateInformation");
}

// if continueQuiz button clicked
proceed_button.onclick = ()=>{
    information_container.classList.remove("initiateInformation"); 
    //This will hide the information container div and go straight to the quiz, question 1
    question_container.classList.add("initiateExam"); 
    //show quiz box
    showQuestions(0); 
    //calling showQestions function
    questionTimer(1); 
    //passing 1 parameter to questionTimer
    startTimer(15); 
    //calling startTimer function
    startTimerLine(0); 
    //calling startTimerLine function
}

var timeValue =  15;
var question_count = 0;
var question_number = 1;
var scoreValue = 0;
var timer;
var timerLine;
var widthValue = 0;

const reset_quiz = score_container.querySelector(".buttons .reset");
const withdraw_quiz = score_container.querySelector(".buttons .withdraw");

// When the rest button is clicked on it will show the container again from the beginning. 
reset_quiz.onclick = ()=>{
    question_container.classList.add("initiateExam"); 

    score_container.classList.remove("activeResult"); 
    // This will remove the results
    timeValue = 15; 
    question_count = 0;
    question_number = 1;
    scoreValue = 0;
    widthValue = 0;
    showQuestions(question_count); 
    // This calls the sQ function
    questionTimer(question_number); 
    // This allows the question_# value to pass to questionTmer.
    clearInterval(timer); 
    // This method clears a timer set
    clearInterval(timerLine); 
    // This will also be cleared
    startTimer(timeValue); 
    // You talking' to me? Nah, I'm calling the function. I know, I'm hilarious.
    startTimerLine(widthValue); 
    // You're also calling another function?!?!? That's right, she's called startTimerLine
    ticker_text.textContent = "Time Left"; 
    // You don;t want to be named ticker_text. I can do you one better. Let's name you Time Left. Who says ticker anymore? 
    onward_button.classList.remove("show"); 
    // Onwards to what? There're no mo' questions so I'm going to hide this button and you're going to receive your score. 
}

// <button class="withdraw">Have a Nice Day!</button> IF the button is clicked, withdraw_quiz.onclick = ();
// THEN you will be redirected to the Ready? window.location.reload()
withdraw_quiz.onclick = ()=>{
    window.location.reload(); 
}

// DOM querySelector() Method to return 1st element that matches CSS selector
const onward_button = document.querySelector("footer .onward_button");
const bottom_question_timer = document.querySelector("footer .correct_total");

// if Next Que button clicked
onward_button.onclick = ()=>{
    if(question_count < questions.length - 1){ //if question count is less than total question length
        question_count++; //increment the question_count value
        question_number++; //increment the question_number value
        showQuestions(question_count); //calling showQuestions function
        questionTimer(question_number); //passing question_number value to questionTimer
        clearInterval(timer); //clear timer
        clearInterval(timerLine); //clear timerLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        ticker_text.textContent = "Time Left"; //change the ticker_text to Time Left
        onward_button.classList.remove("show"); //hide the next button
    }else{
        clearInterval(timer); //clear timer
        clearInterval(timerLine); //clear timerLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuestions(index){
    const question_text = document.querySelector(".question_text");

    //creating a new span and div tag for question and option and passing the value using array index
    var que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question_text.innerHTML = que_tag; //adding new span tag inside que_tag
    choice_select.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = choice_select.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
var tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(timer); //clear timer
    clearInterval(timerLine); //clear timerLine
    var userAns = answer.textContent; //getting user selected option
    var correcAns = questions[question_count].answer; //getting correct answer from array
    const sumChoices = choice_select.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        scoreValue += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + scoreValue);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < sumChoices; i++){
            if(choice_select.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                choice_select.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                choice_select.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < sumChoices; i++){
        choice_select.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    onward_button.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    information_container.classList.remove("initiateInformation"); //hide info box
    question_container.classList.remove("initiateExam"); //hide quiz box
    score_container.classList.add("activeResult"); //show result box
    const gradeScore = score_container.querySelector(".grade");
    if (scoreValue > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        var scoreTag = '<span>and congrats! 🎉, You got <p>'+ scoreValue +'</p> out of <p>'+ questions.length +'</p></span>';
        gradeScore.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(scoreValue > 1){ // if user scored more than 1
        var scoreTag = '<span>and nice 😎, You got <p>'+ scoreValue +'</p> out of <p>'+ questions.length +'</p></span>';
        gradeScore.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        var scoreTag = '<span>and sorry 😐, You got only <p>'+ scoreValue +'</p> out of <p>'+ questions.length +'</p></span>';
        gradeScore.innerHTML = scoreTag;
    }
}

function startTimer(time){
    timer = setInterval(countdown, 1000);
    function countdown(){
        tickerDown.textContent = time; //changing the value of tickerDown with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            var addZero = tickerDown.textContent; 
            tickerDown.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(timer); //clear timer
            ticker_text.textContent = "Time Off"; //change the time text to time off
            const sumChoices = choice_select.children.length; //getting all option items
            var correcAns = questions[question_count].answer; //getting correct answer from array
            for(i=0; i < sumChoices; i++){
                if(choice_select.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    choice_select.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    choice_select.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < sumChoices; i++){
                choice_select.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            onward_button.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    timerLine = setInterval(countdown, 29);
    function countdown(){
        time += 1; //upgrading time value with 1
        if(time > 549){ //if time value is greater than 549
            clearInterval(timerLine); //clear timerLine
        }
    }
}

function questionTimer (index){
    //creating a new span tag and passing the question number and total question
    var totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_question_timer.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_question_timer
}