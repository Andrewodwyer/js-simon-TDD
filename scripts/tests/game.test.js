/**
 * @jest-environment jsdom
 */

//const { default: test } = require("node:test");
const { game } = require("../game"); // retrieve the game function from the game.js file

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