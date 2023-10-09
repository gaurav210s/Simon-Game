var gamePattern = []; 
var userClickedPattern = []; 
var level = 0;
var started = false; 

var colors = ["red", "blue", "green", "yellow"];

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level); 
        nextSequence(); 
        started = true; 
    }
});

function nextSequence(){
    userClickedPattern = []; 

    level++; 
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4); 
    randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    let toSelect = "#" + randomChosenColor; 
    $(toSelect).fadeOut(50).fadeIn(50); 

    playSound(randomChosenColor);

}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor); 

    playSound(userChosenColor); 
    animatePress(userChosenColor); 

    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed"); 
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); 
    }, 100); 
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play(); 
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }else{
        $("body").addClass("game-over");
        $("h1").text("Game over, press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 200)
        playSound("wrong");
        startOver(); 
    }

}

function startOver(){
    level = 0; 
    gamePattern = []; 
    started = false; 
}
