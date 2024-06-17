/**
 * @jest-environment jsdom
 */

//const { default: test } = require("node:test");
const { game, newGame, showScore } = require("../game"); // retrieve the game function from the game.js file

// before All sets up the DOM once all the other tests have run
beforeAll(() => {
    let fs = require("fs"); // fs library which is part of nodes standard library
    let fileContents = fs.readFileSync("index.html", "utf-8"); // readFileSync reads the files in the parentheses, uts-8 is a character set
    document.open(); // open, write and close will be the same for every html document you want to load into the DOM
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => { //score key exists is a describe name, same with the below test
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => { 
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => { 
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        //jest .toEqual matcher method
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"])  // game.choices, we are picking out the choices key from our game object. we expect the array to have the values of button1 etc
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42"; // 42 need to be a string as the test checks for a string and not a number
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0); // we expect the innertxt of score element to equal 0
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0); // check if the lenght of the array is now 0
    });
    test("should clear the computer sequence array", () => {
        expect(game.currentGame.length).toBe(0);
    });
});