var questionArr = [
	new QuestionObj("question1", ["correct", "answer1-2", "answer1-3", "answer1-4"]), // 1 || index = 0
	new QuestionObj("question2", ["correct", "answer2-2", "answer2-3", "answer2-4"]), // 2 || index = 1
	new QuestionObj("question3", ["correct", "answer3-2", "answer3-3", "answer3-4"]), // 3 || index = 2
	new QuestionObj("question4", ["correct", "answer4-2", "answer4-3", "answer4-4"])  // 4 || index = 3 || array.length = 4
];

var usedQuestionArr = [];

// questionArr[questionArr.length-1]; // last element in an array

// var array = ["bread", "milk", "eggs", "turkey"];

// for(var i = 0; i<array.length; i++){
// 	array[i];
// }

// var question1 = new QuestionObj("question1", "Text1", ["answer1-1", "answer1-2"]);

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


function grabRand(type){
	var index = Math.floor(Math.random()*questionArr.length);
	var thisQuestion = [questionArr[index]];
	usedQuestionArr.push(questionArr.splice(index, 1)[0]);
	doStuff(type, thisQuestion);
}

function doStuff(type, thisQuestion){
	var type = type || "default";
	var thisQuestion = thisQuestion || questionArr; 
	var currentQuestion, currentAnswersArr;

	for(var i = 0; i < thisQuestion.length; i++){
		currentQuestion = thisQuestion[i].question;
		currentAnswersArr = thisQuestion[i].answers;
		if(type === "display"){
			display(currentQuestion, currentAnswersArr);
		} else if(type === "reset"){
			reset();
		}
	}
}

function display(question, answersArr){
	console.log("Question: " + question);
	var loopNum = answersArr.length;
	for(var i = 0; i < loopNum; i++){
		var index = Math.floor(Math.random()*answersArr.length);
		console.log("-- Answer " + (i + 1) + ": " + answersArr.splice(index, 1)[0]);
	}
	console.log("");
}

function reset() {

}

/* To Select Random Array index and Not repeat */
/*---------------------------------------------*/

/* 	Test Variables:  */
/* -----------------------*/

//	var array = ["number 1", "number 2", "number 3", "number 4"];

/*------------------------*/

/*
	// Store the total number of array elements
	var loopNum = array.length;

	// Create a new array (outArr) with the same values as the array
	var outArr = Array.from(array);

	// Loop the number of elements times
	for(var i = 0; i < loopNum; i++){
		
		// Create a random index of outArr
		var index = Math.floor(Math.random()*outArr.length);

		// Remove and store value of the element at the random index 
		var out = outArr.splice(index, 1)[0]

		// Use the random array element as needed (Output)
		console.log(out);

	}
*/
