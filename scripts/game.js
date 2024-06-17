/**
 * @jest-environment jsdom
 */

let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    showScore();
}

function showScore() {
    document.getElementById("score").innerText = game.score; // get the element and set it inner text to game.score
}

module.exports = { game, newGame, showScore }; // this imports all the functions to the game.test.js file