// PSEUDOCODE - TASKS

    // HTML
        // Container for Instructions of Game.
        // Container for computer's score.
        // Container for user total score.
        // Container for "You Win!" / "You Lose!" text to display.
        // Container for user's total wins.
        // Container for user's total losses.
        // Container for Gem Images
        // Reset Game button


    // jQuery
        // var gameInstructions - game instructions text.

        // var scoreForComputer - Randomly generated score, should be between 19-120.
        // var scoreForGem1 - Random generated score, should be between 1-12.
        // var scoreForGem2 - Random generated score, should be between 1-12.
        // var scoreForGem3 - Random generated score, should be between 1-12.
        // var scoreForGem4 - Random generated score, should be between 1-12.

        // var userInitialScore - User's initial score is 0.
        // var userTotalScore - When user presses a Gem, it's value gets added to the total score.
        
        // If 
            // a user's total score is equal to the computer's score, "You Win!" is displayed in the HTML.
            // New game begins and 1 is added to the user's total wins (Game cycles back to the start without reloading page).

        // Else
            // a user's total score is greater than the computer's score, "You Lose!" is displayed in the HTML.
            // New game begins and 1 is added to the user's total losses (Game cycles back to the start without reloading page).

        // If 
            // user presses Reset Game button, page reloads.

// --------------------------------------------------------------------------------
// jQuery

// Global Variables

var gameInstructions = "these are the game instructions"

// Array that holds the paths to the images
var gemImageSource = [4];
gemImageSource [0] = "https://via.placeholder.com/150";
gemImageSource [1] = "https://via.placeholder.com/150";
gemImageSource [2] = "https://via.placeholder.com/150";
gemImageSource [3] = "https://via.placeholder.com/150";

var scoreForComputer  =  Math.floor(Math.random() * 120) + 19;     // Score should be between 19-120
var scoreForGem1 = Math.floor(Math.random() * 12) + 1;      // Score should be between 1-12
var scoreForGem2 = Math.floor(Math.random() * 12) + 1;
var scoreForGem3 = Math.floor(Math.random() * 12) + 1;
var scoreForGem4 = Math.floor(Math.random() * 12) + 1;

// Array that holds the different score options for the gems
var scoreOptionsForGems = [scoreForGem1, scoreForGem2, scoreForGem3, scoreForGem4];

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


    // Write game instructions to container
    $(".gameInstructionsContainer").html(gameInstructions);

        // The above rewritten in JavaScript would be:
        // document.getElementsByClassName("gameInstructionsContainer")[0].innerHTML = gameInstructions


    // Write computer score to container 
    $(".computerScoreContainer").html("Computer score: " + scoreForComputer);


    // Write user wins to container
    $(".userWinContainer").html("Wins: " + userTotalWins);
    // Write user loss to container
    $(".userLossContainer").html("Losses: " + userTotalWins);


    // "for loop" to cycle through each element in the scoreOptionsForGems array
    // and assign image tag, class, and image source to each of them.
    // The same image will be assigned to each image if using a for loop.
    for (var i = 0; i < scoreOptionsForGems.length; i++) {

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
            userTotalWins++;    // userTotalWins goes up by 1
            $(".userWinContainer").html("Wins: " + userTotalWins);
        
            // Function to call for a new game

        }

        else if (counter >= scoreForComputer) {
            $(".youWinYouLoseContainer").html("You lose!");
            userTotalLosses++;    // userTotalLosses goes up by 1    
            $(".userLossContainer").html("Losses: " + userTotalLosses);

            // Function to call for a new game

        }

    });

}