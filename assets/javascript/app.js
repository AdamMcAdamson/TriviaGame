var questionArr = [
	new QuestionObj("question1", "Text1", ["answer1-1", "answer1-2"]), // 1 || index = 0
	new QuestionObj("question2", "Text2", ["answer2-1", "answer2-2"]), // 2 || index = 1
	new QuestionObj("question3", "Text3", ["answer3-1", "answer3-2"]), // 3 || index = 2
	new QuestionObj("question4", "Text4", ["answer4-1", "answer4-2"])  // 4 || index = 3 || array.length = 4
];

questionArr[questionArr.length-1]; // last element in an array

var array = ["bread", "milk", "eggs", "turkey"];

for(var i = 0; i<array.length; i++){
	array[i];
}

var question1 = new QuestionObj("question1", "Text1", ["answer1-1", "answer1-2"]);

// questionArr = Array.from(usedQuestionArr);
// move questions from usedQuestionArr to questionArr;
questionArr = usedQuestionArr.splice(0, usedQuestionArr.length);

function QuestionObj(question, correct, answers, time, img){
	this.question = question; // string
	this.correctAnswer = correct;
	this.answers = answers; // array
	this.time = time || 30; // int - time in seconds
	this.img = img || null;
	this.element = null;
}


$("#button-div").on("click", function(event){ 
	doStuff(target.event.id);
});

function grabRand(type){
	var index = Math.floor(Math.random()*questionArr.length);
	var thisQuestionArr = [questionArr[index]];
	usedQuestionArr.push(questionArr.splice(index, 1));
	doStuff(type, thisQuestionArr);
}

function doStuff(type, thisQuestion){
	var type = type || "default";
	var thisQuestion = thisQuestion || questionArr; 
	var currentQuestion, currentAnswersArr;

	for(var i = 0; i < questionArr.length; i++){
		currentQuestion = questionArr[i].question;
		currentAnswersArr = questionArr[i].answers;
		if(type === "display"){
			display();
		} else if(type === "reset"){
			reset();
		}
	}
}

function display(){
	console.log("Question: " + currentQuestion);
	for(var i = 0; i < currentAnswersArr.length; i++){
		console.log("-- Answer " + (i + 1) + ": " + currentAnswersArr[i]);
	}
	console.log("");
}

function reset() {

}