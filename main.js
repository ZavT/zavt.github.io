//load finish than let code run
document.addEventListener("DOMContentLoaded", function() {

/*Navbar*/
const navMenu = document.getElementById("nav-menu");
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

navMenu.addEventListener("click", function(event) {
   
	if (event.target.tagName === "BUTTON") {
		
		const targetPageId = event.target.getAttribute("data-target");
	   
		pages.forEach(function(page) {
			page.classList.remove("active");
			page.classList.add("hidden");
		});
		
		navButtons.forEach(function(btn) {
			btn.classList.remove("active-btn");
		});

		// hightligh current page button
		document.getElementById(targetPageId).classList.remove("hidden");
		document.getElementById(targetPageId).classList.add("active");
		event.target.classList.add("active-btn");
	}
});
	
/*Quiz*/
let score = 0;
let currentTab = 0; 

showTab(currentTab); 

document.getElementById("prevBtn").addEventListener("click", function() {
	nextPrev(-1);
});
document.getElementById("nextBtn").addEventListener("click", function() {
	nextPrev(1);
});
document.getElementById("resetBtn").addEventListener("click", resetQuiz);

document.getElementById("redoBtn").addEventListener("click", resetQuiz);

    // show curr tab
    function showTab(n) {
        let tabs = document.getElementsByClassName("tab");
        tabs[n].style.display = "block";
        
        // prev shows up after first qn
        if (n === 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        
        // submit button for the last qn
        if (n === (tabs.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        
        //show progress dots
        fixStep(n);
}

    //next qns or prev qns
    function nextPrev(n) {
        let tabs = document.getElementsByClassName("tab");
        
        //answer qns before going next 
        if (n === 1 && !checkForm()) {
            return false;
        }
        
        tabs[currentTab].style.display = "none";
        currentTab = currentTab + n;
        
        //check if end of quiz
        if (currentTab >= tabs.length) {
            markAns(); //calculate the final score
            document.getElementById("Buttons").style.display = "none"; // Hide Prev & Next
            return false;
        }
        
        // if not show the next qns
        showTab(currentTab);
    }

    //an answer has been sleceted 
    function checkForm() {
        let tabs = document.getElementsByClassName("tab");
        let radios = tabs[currentTab].querySelectorAll("input[type='radio']");
        let isValid = false;
        
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                isValid = true;
                break;
            }
        }
        
        if (isValid) {
            document.getElementsByClassName("step")[currentTab].className += " finish";
        } else {
            alert("Please select an answer to continue!");
        }
        
        return isValid; 
    }

    //show progress
    function fixStep(n) {
        let steps = document.getElementsByClassName("step");
        for (let i = 0; i < steps.length; i++) {
            steps[i].className = steps[i].className.replace(" active", "");
        }
        if(steps[n]) {
            steps[n].className += " active";
        }
    }

    //calculates the score
    function markAns() {
        score = 0; 
        const scorebox = document.getElementById("scorebox");
        function getAnswer(qnsName) {
            const selected = document.querySelector("input[name='" + qnsName + "']:checked");
            return selected ? selected.value : "";
        }

        if (getAnswer("q1") === "Fighting") score++;
        if (getAnswer("q2") === "Painting") score++;
        if (getAnswer("q3") === "cry") score++;
        if (getAnswer("q4") === "Tired") score++;
        if (getAnswer("q5") === "8") score++;
        scorebox.innerHTML = "You scored: " + score + " out of 5!";
		
		document.getElementById("redoBtn").style.display = "block";
    }

    //uncheck all radio and back to first qns
    function resetQuiz() {
        let tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }

        //uncheck all radio buttons
        let radios = document.querySelectorAll("input[type='radio']");
        for (let i = 0; i < radios.length; i++) {
            radios[i].checked = false;
        }

        //remove all progress
        let steps = document.getElementsByClassName("step");
        for (let i = 0; i < steps.length; i++) {
            steps[i].className = steps[i].className.replace(" finish", "");
            steps[i].className = steps[i].className.replace(" active", "");
        }

        document.getElementById("scorebox").innerHTML = "Not submitted";
        document.getElementById("Buttons").style.display = "block"; 

        //restart from the beginning
        currentTab = 0;
        showTab(currentTab);
    }
	
/*Mini game*/
const character = document.getElementById("character");
const block = document.getElementById("block");
const scoreDisplay = document.getElementById("gameScore");
const timerDisplay = document.getElementById("gameTimer");
const highScoreDisplay = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");

const jumpAudio = new Audio("audio/jump.mp3");
const loseAudio = new Audio("audio/lose.mp3");

let gameScore = 0;
let highScore = 0;
let timeLeft = 30;
let GameOver = true; 
let timerInterval;

//start 
startBtn.addEventListener("click", startGame);

	function startGame() {
		GameOver = false;
		gameScore = 0;
		timeLeft = 30;
		
		scoreDisplay.innerHTML = "Score: " + gameScore;
		timerDisplay.innerHTML = "Time: " + timeLeft + "s";
		startBtn.style.display = "none"; 
		
		// fence starts moving
		block.style.animation = "block 1.5s infinite linear";
		
		//timer
		clearInterval(timerInterval);
		timerInterval = setInterval(function() {
			timeLeft--;
			timerDisplay.innerHTML = "Time: " + timeLeft + "s";
			
			//end time 
			if (timeLeft <= 0) {
				endGame();
			}
		}, 1000);
	}

	function endGame() {
		GameOver = true;
		clearInterval(timerInterval);
		block.style.animation = "none"; 
		
		//update high score
		if (gameScore > highScore) {
			highScore = gameScore;
			highScoreDisplay.innerHTML = "High Score: " + highScore;
		}
		
		startBtn.innerHTML = "Play Again";
		startBtn.style.display = "inline-block"; 
	}

	document.addEventListener("click", jump);

	function jump(event) {
		
		if (event.target.id === "startBtn") return;

		// check if in game tab
		const gamePage = document.getElementById("game");
		if (!gamePage.classList.contains("active")) {
			return; 
		}
		
		//no jumping again if in animation or game 
		if (character.classList.contains("animate") || GameOver) { 
			return; 
		}
		
		jumpAudio.play();
		character.classList.add("animate");
		
		setTimeout(function() {
			character.classList.remove("animate");
		}, 400); 
	}

	//
	block.addEventListener('animationiteration', function() {
		if (!GameOver) {
			gameScore++;
			scoreDisplay.innerHTML = "Score: " + gameScore;
		}
	});

	//Collision 
	setInterval(function() {
		if (GameOver) return; 

		let characterRect = character.getBoundingClientRect();
		let blockRect = block.getBoundingClientRect();
		
		//check sheep touching fence
		if (
			characterRect.right > blockRect.left &&
			characterRect.left < blockRect.right &&
			characterRect.bottom > blockRect.top &&
			characterRect.top < blockRect.bottom
		) {
			//pause animation to reset block
			block.style.animation = "none";
			void block.offsetWidth; 
			
			loseAudio.play();
			
			if (gameScore > 0) {
				gameScore--;
			}
			scoreDisplay.innerHTML = "Score: " + gameScore;
			
			
			block.style.animation = "block 1.5s infinite linear";
		}
	}, 10);

});