var questionArr = [
	new QuestionObj("What is Xanthophobia?", ["The fear of the color Yellow", "The fear of Crabs", "The fear of having too large of feet", "The fear of walking too fast"], "assets/images/yellow.jpg"),
	new QuestionObj("What is Turophobia?", ["The fear of Cheese", "The fear of Renting Cars", "The fear of wearing Socks with Holes", "The fear of Bulls"], "assets/images/cheese.jpg"), 
	new QuestionObj("What is Somniphobia?", ["The fear of Falling Asleep", "The fear of Crying in front of a Relative", "The fear of Sad Music", "The fear of Losing an Arm"], "assets/images/sleep.jpg"), 
	new QuestionObj("What is Coulrophobia?", ["The fear of Clowns", "The fear of Vibrant Colors", "The fear of Wind", "The fear of Becoming Overweight"], "assets/images/clowns.jpg"),
	new QuestionObj("What is Hylophobia?", ["The fear of Trees", "The fear of the Mood Swings", "The fear of the Periodic Table", "The fear of Sexual Kinks"], "assets/images/trees.jpg"),
	new QuestionObj("What is Omphalophobia?", ["The fear of the Belly Button", "The fear of Slippery Surfaces", "The fear of Effort", "The fear of Midgets"], "assets/images/navel.jpg"),
	new QuestionObj("What is Nomophobia?", ["The fear of having no Cell Phone Coverage", "The fear of Stopping", "The fear of AI Robots", "The fear of the Inside of the Knee"], "assets/images/phone.jpg"),
	new QuestionObj("What is Ombrophobia?", ["The fear of Rain", "The fear of being Homeless", "The fear of Yawning", "The fear of having one's Neck Snapped from Behind"], "assets/images/rain.jpg"),
	new QuestionObj("What is Papaphobia?", ["The fear of the Pope", "The fear of one's Significant Other's Father", "The fear of being Abandoned by Men", "The fear of Masculinity"], "assets/images/pope.jpg"),
	new QuestionObj("What is Uranophobia?", ["The fear of Heaven", "The fear of Planetary Exploration", "The fear of Growing Up", "The fear of Peeing"], "assets/images/heaven.jpg"),
	new QuestionObj("What is Pogonophobia?", ["The fear of Beards", "The fear of Jumping", "The fear of Arguments", "The fear of Having Regrets"], "assets/images/beards.jpg"),
	new QuestionObj("What is Trypophobia?", ["The fear of Small Holes", "The fear of Dynosaurs", "The fear of Physical Harm", "The fear of Salt Water"], "assets/images/small_holes.jpg"),
	new QuestionObj("What is Triskaidekaphobia?", ["The fear of the Number 13", "The fear of Open Doors", "The fear of Tripping down Stairs", "The fear of one's Birth Year"], "assets/images/number13.jpg"),
];

var usedQuestionArr = [];

var curAnswer = null;

var answerKey = -1;

var questionMasterDiv;
var questionDiv, timeRemainTag, questionTextTag, answersDiv;

var timer;

var baseTime = -1;
var timeLeft = -1;

var image = "";

var numCorrect = 0;
var numWrong = 0;
var numUnanswered = 0;

// questionArr = Array.from(usedQuestionArr);
// move questions from usedQuestionArr to questionArr;
// questionArr = usedQuestionArr.splice(0, usedQuestionArr.length);

function QuestionObj(question, answers, img, time){
	this.question = question; // string
	this.answers = answers; // array
	this.img = img || "assets/images/temp.png";
	this.time = time || 20; // int - time in seconds
}


// $("#button-div").on("click", function(event){ 
// 	doStuff(target.event.id);
// });

function grabRand(){
	var index = Math.floor(Math.random()*questionArr.length);
	var thisQuestion = questionArr[index];
	usedQuestionArr.push(questionArr.splice(index, 1)[0]);
	handleQuestion(thisQuestion);
}

function handleQuestion(thisQuestion){
	var question = thisQuestion.question; 
	var answersArr = Array.from(thisQuestion.answers);
	curAnswer = answersArr[0];
	baseTime = thisQuestion.time;
	image = thisQuestion.img; 

	// clear old answer
	answerKey = -1;
	// console.log("\n\n\n\n___________CLEAR____________\n\n\n\n");


	// console.log("____________________________");
	// console.log("Question: " + question);

	
	questionDiv = $('<div id="question-div">');

	timeRemainTag = $('<h3 id="time-remaining" class="center">TEMP TIME REMAINING TEXT</h3>');
	questionTextTag = $('<h2 id="question-text" class="center">' + question + '</h2>');

	answersDiv = $('<div id="answers-div">');

	var loopNum = answersArr.length;
	for(var i = 0; i < loopNum; i++){
		var index = Math.floor(Math.random()*answersArr.length);
		// console.log("-- Answer " + (i) + ": " + answersArr.splice(index, 1)[0]);
		
		answersDiv.append('<h2 id="answer-' + i + '" class="answer clickable center" key="'+ (i) +'">' + answersArr.splice(index, 1)[0] + '</h2>');

		if(index === 0 && answerKey === -1){
			// console.log("^CORRECT^");
			answerKey = i;
		}
	}

	questionDiv.append(timeRemainTag);
	questionDiv.append(questionTextTag);

	// console.log(questionDiv);
	// console.log("Correct Answer (zero-based): " + (answerKey));
	// console.log("____________END_____________");

	questionMasterDiv.empty();
	questionMasterDiv.append(questionDiv);
	questionMasterDiv.append(answersDiv);
	handleTimer();
}

function handleTimer(){

	var timeRemainingTag = $("#time-remaining");

	timeLeft = baseTime;

	timeRemainingTag.text("Time Remaining: " + timeLeft);

	timer = setInterval(function(){
		timeLeft--;
		timeRemainingTag.text("Time Remaining: " + timeLeft);
		if(timeLeft === 0){
			endQuestion("early");
		}
	}, 1000);

}

function endQuestion(type){

	clearInterval(timer);
	var displayCorrectAns = false;
	var outputText = "NULL";
	
	if(type === "early"){
		numUnanswered++;
		outputText = "Out of Time!";
		displayCorrectAns = true;
	} else if(type === "wrong"){
		numWrong++;
		outputText = "Nope!";
		displayCorrectAns = true;
	} else if(type === "correct"){
		numCorrect++;
		outputText = "Correct!";
	} else {
		console.log("[ERROR] endQuestion: Unknown parameter - " + type);
	}

	questionTextTag.text(outputText);
	answersDiv.remove();
	if(displayCorrectAns){
		questionDiv.append('<h3 id="correct-answer" class="center">The Correct Answer was: ' + curAnswer);
	}
	questionDiv.append('<img class="question-img" src="' + image + '" alt="Question Image">');
	if(questionArr.length > 0){
		inbetweenText();
	} else{
		endGame();
	}

}
function inbetweenText(){
	setTimeout(function(){
		questionMasterDiv.html("<h1 class='inbetween-text center'>Here Comes the Next Question</h1>");
	}, 3500);
	setTimeout(function(){
		grabRand();
	}, 6000);
}

function endGame() {
	setTimeout(function(){
		questionMasterDiv.html("<h1 class='inbetween-text center'>Game Over!</h1>");
	}, 3500);
	setTimeout(function(){
		questionMasterDiv.empty();
		questionMasterDiv.append("<h2 id='result-game-over' class='center'>Game Over</h2>");
		questionMasterDiv.append("<h2 id='result-text' class='center'>Here is how you did</h2>");
		var resultsDiv = $("<div id='results-div'>");
		resultsDiv.append("<p id='num-correct' class='results-item center'>Correct Answers: " + numCorrect + "</p>");
		resultsDiv.append("<p id='num-correct' class='results-item center'>Incorrect Answers: " + numWrong + "</p>");
		resultsDiv.append("<p id='num-correct' class='results-item center'>Unanswered: " + numUnanswered + "</p>");
		questionMasterDiv.append(resultsDiv);

		questionMasterDiv.append("<h1 id='start-over' class='clickable reset center'>Start Over?</h1>");

	}, 5750);
}

function reset(){
	questionArr = usedQuestionArr.splice(0);

	numCorrect = 0;
	numWrong = 0;
	numUnanswered = 0;

	grabRand();
}

$( document ).ready(function(){
	// Do stuff
	questionMasterDiv = $("#question-master-div");

	questionMasterDiv.on("click", ".clickable", function(event){
		// console.log("CLICK DETECTED");
		if($(this).hasClass("answer")){
			if(parseInt($(this).attr("key")) === answerKey){
				endQuestion("correct");
			} else {
				endQuestion("wrong");
			}
		} else if($(this).hasClass("start")){
			grabRand();
		} else if($(this).hasClass("reset")){
			reset();
		}
	})


});
