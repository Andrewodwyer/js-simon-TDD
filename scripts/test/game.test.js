/**
 * @jest-environment jsdom
 */
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game"); // retrieve the game function from the game.js file

jest.spyOn(window, "alert").mockImplementation(() => { });
// before All sets up the DOM once all the other tests have run
beforeAll(() => {
    let fs = require("fs"); // fs library which is part of nodes standard library
    let fileContents = fs.readFileSync("index.html", "utf-8"); // readFileSync reads the files in the parentheses, uts-8 is a character set
    document.open(); // open, write and close will be the same for every html document you want to load into the DOM
    document.write(fileContents);
    document.close();
});

describe("pre-game", () => {
    test("clicking buttons before newGame should fail", () => {
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
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
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
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
    test("expect data-listener to be true", () => {
        newGame();
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true"); // data-listener attribe is equal to true
        }
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
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns(); // should reset the turn number
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!"); //expected text .toBeCalledWith
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});