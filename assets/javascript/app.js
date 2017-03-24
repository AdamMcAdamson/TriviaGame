var questionArr = [
	new QuestionObj("question1", ["correct", "answer1-2", "answer1-3", "answer1-4"]), // 1 || index = 0
	new QuestionObj("question2", ["correct", "answer2-2", "answer2-3", "answer2-4"]), // 2 || index = 1
	new QuestionObj("question3", ["correct", "answer3-2", "answer3-3", "answer3-4"]), // 3 || index = 2
	new QuestionObj("question4", ["correct", "answer4-2", "answer4-3", "answer4-4"])  // 4 || index = 3 || array.length = 4
];

var usedQuestionArr = [];

var answerKey = -1;

// questionArr = Array.from(usedQuestionArr);
// move questions from usedQuestionArr to questionArr;
// questionArr = usedQuestionArr.splice(0, usedQuestionArr.length);

function QuestionObj(question, answers, time, img){
	this.question = question; // string
	this.answers = answers; // array
	this.time = time || 30; // int - time in seconds
	this.img = img || null;
	this.element = null;
}


// $("#button-div").on("click", function(event){ 
// 	doStuff(target.event.id);
// });

while(questionArr.length > 0){
	grabRand("display");
}


function grabRand(){
	var index = Math.floor(Math.random()*questionArr.length);
	var thisQuestion = questionArr[index];
	usedQuestionArr.push(questionArr.splice(index, 1)[0]);
	handleQuestion(thisQuestion);
}

function handleQuestion(thisQuestion){
	var question = thisQuestion.question; 
	var answersArr = thisQuestion.answers;

	// clear old answer
	console.log("\n\n\n\n___________CLEAR____________\n\n\n\n");

	console.log("____________________________");
	console.log("Question: " + question);

	answerKey = -1;
	
	var loopNum = answersArr.length;
	for(var i = 0; i < loopNum; i++){
		var index = Math.floor(Math.random()*answersArr.length);
		console.log("-- Answer " + (i + 1) + ": " + answersArr.splice(index, 1)[0]);
		if(index === 0 && answerKey === -1){
			console.log("^CORRECT^");
			answerKey = i;
		}
	}
	console.log("Correct Answer: " + (answerKey + 1));
	console.log("____________END_____________");
}

function reset() {

}

