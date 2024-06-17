/**
 * @jest-environment jsdom
 */

//const { default: test } = require("node:test");
const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game"); // retrieve the game function from the game.js file

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
    test("turnNumber key exists", () => { 
        expect("turnNumber" in game).toBe(true);
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
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
});
// describe is a block
//beforeAll run before all the test are run, beforeEach runs before each of the tests are run
describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = []; // reset the array each time
        game.playerMoves = [];
        addTurn(); // run add turn function to add a new turn to the current game array
    });
    // afterEach
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn(); // addTurn adds a new turn to the array, test to check if the array is now 2
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]); // [0] is the first element in the currentGame array
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain(game.currentGame[0] + "light"); // .toContain is a new jest matcher. the button classlist contains the light class
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns(); // should reset the turn number
        expect(game.turnNumber).toBe(0);
    });
});