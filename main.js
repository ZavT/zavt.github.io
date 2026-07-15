//Ball 
//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page1=document.querySelector("#page1");
const page2=document.querySelector("#page2");
const page3=document.querySelector("#page3");
function hideall(){ //function to hide all pages
page1.style.display="none";
page2.style.display="none";
page3.style.display="none";
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
hideall(); //we don't know which page is shown, so hideall
page1.style.display="block";
});
page2btn.addEventListener("click", function () {
hideall(); //we don't know which page is shown, so hideall
page2.style.display="block";
});
page3btn.addEventListener("click", function () {
hideall(); //we don't know which page is shown, so hideall
page3.style.display="block";
});
hideall(); //call hideall function to hide all pages


/*find references to all the buttons and ball */
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
var ballX = ballY = 0; //assign initial position of ball
function ResetPos() {
ballX=ballY=0; //reset to zero
ball.style.left = ballX+"px"; //set left property to ball x variable
ball.style.top = ballY+"px"; //set top property to ball x variable
ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}
function MovePos(leftInc, topInc) {
ballX =ballX+ leftInc;
ballY =ballY+ topInc;
ball.style.left = ballX+"px"; //set left css property to ball x variable
ball.style.top = ballY+"px"; //set top css property to ball y variable
ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}
function MoveLeft(){
ballX =ballX-10; //decrement by 10
ballY =ballY+0; //no change
ball.style.left = ballX+"px"; //set left css property to ball x variable
ball.style.top = ballY+"px"; //set top css property to ball y variable
ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}
//eventlistener to activate MoveLeft (named callback function)
leftBtn.addEventListener("click", MoveLeft); //no brackets after MoveLeft
//eventListener to anonymous callback function (other way)
rightBtn.addEventListener("click", function () {
MovePos(10, 0);
});
upBtn.addEventListener("click", function () {
MovePos(0, -10);
});
downBtn.addEventListener("click", function () {
MovePos(0, 10);
});
resetBtn.addEventListener("click", ResetPos);

document.addEventListener('keydown', function (kbEvt) {
//kbEvt: an event object passed to callback function
console.log(kbEvt); //see what is returned
if (kbEvt.code === "ArrowRight"){
MovePos(10,0);
}
if (kbEvt.code === "ArrowLeft"){
MoveLeft();
}
if (kbEvt.code === "ArrowDown"){
MovePos(0, 10);
}
if (kbEvt.code === "ArrowUp"){
MovePos(0, -10);
}
//Better option: use switch case instead
});


// Durian game
const durianId = document.getElementById("durianId");

function GetRandom(min,max){
	//this will select a number between min and max
return Math.round(Math.random() * (max - min)) + min;
}

function MoveDurian() {
durianId.style.left = GetRandom(0, 500) + "px";
durianId.style.top = GetRandom(0, 500) + "px";
}

var moveDurianItvId = setInterval(MoveDurian, 1000);

const scoreBox=document.getElementById("scoreBox");
const popAudio = new Audio("popsound.mp3");

var score=0; //to track how many clicks
function durianCatch() {
//increases score after clicking
score++;

//update html scorebox
scoreBox.innerHTML = "Score: " + score;

//play the audio!
popAudio.play(); 
}

//link durian to mouseclick towst durianCatch function
durianId.addEventListener("click",durianCatch);

document.addEventListener("keydown",function(evt){
console.log(evt);
if(evt.code=="KeyT"){
durianId.classList.add("shrink");
}
if(evt.code=="KeyU"){
durianId.classList.remove("shrink");
}
if(evt.code=="KeyA"){
durianId.classList.add("anim1");
}
if(evt.code=="KeyB"){
durianId.classList.remove("anim1");
}
});

