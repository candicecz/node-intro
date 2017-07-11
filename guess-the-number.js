var inquirer = require('inquirer');
var hiddenNumber = Math.floor(Math.random() * (100 - 0)) + 0;
var guesses = 5;
function userInput(){
    return inquirer.prompt({
      message:"Guess a number between 1 and 100",
      name:'guess'
    })

.then(function(answers){
    var guess = parseInt(answers.guess);
    if(guesses){
      guesses --
      if(guess < 1 || guess > 100 || isNaN(guess)){
        console.log("I said, between 1 and 100!");
        return userInput();
      }
      else if(guess < hiddenNumber){
        console.log("Nope, try again. The mystery number is higher than your guess.")
        return userInput();
      }
      else if(guess > hiddenNumber){
        console.log("Nope, try again. The mystery number is lower than your guess.")
        return userInput();
      }
      else if(guess === hiddenNumber){
        console.log("Yep you guessed it!")
       //return userInput();
      }
    }
    else {
      console.log("you lose.");
    }
});
}
userInput();
// var rounds = 0;
// while(var i <5){
//   if(guess < 1 || guess > 100){
//     return console.log("I said, between 1 and 100!" + userInput());
//   }
//   else if (guess === hiddenNumber){
//   return console.log("You guessed right!");
//   }
//   else{
//     if(guess<hiddenNumber){
//       return console.log("Nope, try again. The mystery number is higher.")
//     }
//     console.log("Nope.");
//     return userInput();
//   }
//   i++;
// }
// }
