let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function colorSound(color) {
  let audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
}

function animatePress(currentColour) {

  currentColour = $("#" + currentColour);

  currentColour.addClass("pressed");

  setTimeout(function() {
    currentColour.removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4)
  let randomChosenColour = buttonColours[randomNumber];

  colorSound(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").text("Nível " + level);
  level++;
  return gamePattern.push(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    colorSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Pressione Qualquer Tecla Para Reiniciar");
    startOver();
  }
}

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Nível " + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  colorSound(userChosenColour);
  animatePress(userChosenColour);
})

console.log(gamePattern);
