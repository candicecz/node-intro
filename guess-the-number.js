var inquirer = require('inquirer');
var hiddenNumber = Math.floor(Math.random() * (100 - 0)) + 0;

function userInput(){
    return inquirer.prompt({
      message:"Guess a number between 1 and 100",
      name:'guess'
    })

.then(function(answers){
    var guess = parseInt(answers.guess);
    if(guess < 1 || guess > 100){
      return userInput();
    }
    else {
      if (guess === hiddenNumber){
      return console.log("You guessed right!");
      }
      else{
        console.log("Nope.");
        return userInput();
      }
    }
});
}
userInput();
