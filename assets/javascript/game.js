// PSEUDOCODE - TASKS

    // HTML
        // Container for Instructions of Game.
        // Container for computer's score.
        // Container for user total score.
        // Container for "You Win!" / "You Lose!" text to display.
        // Container for user's total wins.
        // Container for user's total losses.
        // Container for Gem Images
        // Reset game button


    // jQuery
        // var gameInstructions - game instructions text.

        // var scoreForComputer - Randomly generated score, should be between 19-120.
        // var scoreOptionsForGems - Random generated score, should be between 1-12.

        // var counter - User's initial score is 0. When user presses a Gem, it's value gets added to the counter.
        
        // if 
            // the counter is equal to the computer's score, "You Win!" is displayed in the HTML.
            // 1 is added to the user's total wins and new game begins (game cycles back to the start without reloading page).

        // else if
            // the counter is greater than the computer's score, "You Lose!" is displayed in the HTML.
            // 1 is added to the user's total wins and new game begins (game cycles back to the start without reloading page).

        // When user presses Reset game button, page reloads.

// --------------------------------------------------------------------------------
// jQuery

// Global Variables

var backgroundImageSource = "assets/images/PSQuality8/3000px_Treasure_Crop1_ColorAdjust1.jpg";

var gameTitle = "<h1>" + "The Gem Collector" + "</h1>";

var gameInstructions = "You will be given a random number at the start of the game. This is the computer’s score."
                        + "<br></br>" + 
                        "Each of the gems below will be assigned a hidden random number. By clicking on a gem, you will add its number to your total score." 
                        + "<br></br>" + 
                        "If your total score matches the computer’s score exactly, then you win the game." 
                        + "<br></br>" + 
                        "If your total score exceeds the computer’s score, then you lose the game."
                        + "<br></br>" + 
                        "Each time a new game starts, the hidden number of each gem will change.";

var scoreForComputer;

// Array that holds the paths to the gem images
var gemImageSource = [4];
gemImageSource [0] = "assets/images/PSQuality8/120px_Gem1.jpg";
gemImageSource [1] = "assets/images/PSQuality8/120px_Gem2.jpg";
gemImageSource [2] = "assets/images/PSQuality8/120px_Gem3.jpg";
gemImageSource [3] = "assets/images/PSQuality8/120px_Gem4.jpg";

// Array that holds the different score options for the gems
var scoreOptionsForGems = [];

var counter = 0;

var userTotalWins = 0;
var userTotalLosses = 0;


// ----------------------------------------

// Function for a new game
var newGame = function() {

    // Reset game
    // (by doing the following, you don't need to use a function to reload browser)
    counter = 0;
    $("img").remove();
    $(".gemImage").remove();
    $(".imagesForGemsContainer").empty();


    // Write game title to container
    $(".gameTitleContainer").html(gameTitle);


    // Write game instructions to container
    $(".gameInstructionsContainer").html(gameInstructions);

        // The above rewritten in JavaScript would be:
        // document.getElementsByClassName("gameInstructionsContainer")[0].innerHTML = gameInstructions


    // Load Background Image to container
    var imageForBackground = $("<img>");
    imageForBackground.addClass("backgroundImage");     // Class assigned for CSS styling
    imageForBackground.attr("src", backgroundImageSource); 
    $(".backgroundImageContainer").append(imageForBackground); 


    // Generate random number for computer score    
    scoreForComputer  =  Math.floor(Math.random() * 120) + 19;     // Score should be between 19-120
    // Write computer score to container 
    $(".computerScoreContainer").html("Computer score: " + scoreForComputer);


    // User's total score is written to page (This will be 0 because at the start of the game the counter is 0 (see above))
    $(".userTotalScoreContainer").html("Your total score: " + counter);


    // Write user wins to container
    $(".userWinContainer").html("Wins: " + userTotalWins);
    // Write user loss to container
    $(".userLossContainer").html("Losses: " + userTotalLosses);


    // "for loop" to cycle through each element in the scoreOptionsForGems array
    // and assign image tag, class, and image source to each of them.
    // The same image will be assigned to each image if using a for loop.
    for (var i = 0; i < 4; i++) {

        // Generate random number for gems in the scoreOptionsForGems array
        scoreOptionsForGems[i] = Math.floor(Math.random() * 12) + 1;      // Score should be between 1-12

        var imageForGem = $("<img>");
        imageForGem.addClass("gemImage");     // Class assigned for CSS styling
        imageForGem.attr("src", gemImageSource[i]);     // .attr is used to set or return attributes and values of the selected elements.
        imageForGem.attr("dataGemValue", scoreOptionsForGems[i]);      // Each imageForGem is given a data attribute called dataGemValue.  The data attribute will be set to equal to the array value). .attr is used to set or return attributes and values of the selected elements.
        $(".imagesForGemsContainer").append(imageForGem);   // Each imageForGem with its' classes and attributes, will get added to .imagesForGemsContainer.

    }

    singleGame();

}


// ----------------------------------------
// Function for a single game
var singleGame = function() {

    // Click event applies to every gem image on the page
    $(".gemImage").on("click", function() {

        var gemValue = ($(this).attr("dataGemValue"));  
                        // $(this) keyword specifies for us to extract the gem's value of the gem image clicked. "this" in this case is "gemImage".
                        // Using the .attr("dataGemvalue") allows us to extract the value out of the dataGemValue attribute. .attr is used to set or return attributes and values of the selected elements.
        gemValue = parseInt(gemValue);
                        // Attributes on HTML elements are strings.  Therefore we have to convert it to an integer before adding it to the counter
                        // Here we use .parseInt which parses a string and returns an integer.
                        // "parse" means to analyze.  So parseInt in this case would mean to analyze and convert to an integer.
        counter += gemValue;
                        // gemValue is added to the user's counter
                        // += is used here.  This code can be written also as counter = counter + gemValue.  += is a shorthand.

        // User's total score is written to page
        $(".userTotalScoreContainer").html("Your total score: " + counter);

        if (counter === scoreForComputer) {
            $(".youWinYouLoseContainer").html("You win!");
            // userTotalWins goes up by 1
            userTotalWins++;    
            $(".userWinContainer").html("Wins: " + userTotalWins);
            // Function to call for a new game
            newGame();
        }

        else if (counter > scoreForComputer) {
            $(".youWinYouLoseContainer").html("You lose!");
            // userTotalLosses goes up by 1    
            userTotalLosses++;    
            $(".userLossContainer").html("Losses: " + userTotalLosses);
            // Function to call for a new game
            newGame();
        }

    });

}


// When user clicks reloadBrowserButton, page reloads
function onClickReload() {
    location.reload();
}


// The following is crucial to have.  It is saying that
// when the ENTIRE document is ready, then the function newGame will execute
$(document).ready(function() {
    newGame();
})