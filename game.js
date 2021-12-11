
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false ;

var level = 0 ;

var indexLevel = 0 ;


$(document).keydown(function (){
	if(!gameStarted) {
		nextSequence();
		gameStarted = true ;
	};
});

$("div").click(function () {
	var userChosenColour = this.id;

	if (userChosenColour != "") {

		userClickedPattern.push(userChosenColour);

		playSound(userChosenColour);
		animatePress(userChosenColour);

		checkAnswer(indexLevel);
	}

});


function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];

	level++;
	$("#level-title").text("level " + level);

	$("#" + randomChosenColour).fadeOut(100).fadeIn(100);                                     //flash animation

	playSound(randomChosenColour);
	return gamePattern.push(randomChosenColour);
}


function playSound(name) {
	var btnSound = new Audio("sounds/" + name + ".mp3");                        //sounds
	btnSound.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {

	console.log(currentLevel);

	if ( userClickedPattern[currentLevel] == gamePattern[currentLevel] ) {

	console.log("success");

	indexLevel++;

	if ( userClickedPattern.length == gamePattern.length) {

		indexLevel = 0 ;
		userClickedPattern = [] ;

		setTimeout(function () {
			nextSequence();
		}, 1000 );

	}

	}
	else {
		console.log("wrong");

		var wrongSound = new Audio("sounds/wrong.mp3");                        //wrong sound
		wrongSound.play();

		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200 );

		$("h1").text("Game Over, Press Any Key to Restart");

		startOver();
	}

}


function startOver() {

	indexLevel = 0 ;
	userClickedPattern = [] ;
	gameStarted = false ;
	gamePattern = [];
	level = 0 ;


}
