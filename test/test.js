// var assert = require('assert');
const chai = require("chai");

const {assert, expect} = chai;
const TestingFunctions = require("../testing");
const {evaluateCode, checkEvalSafety} = TestingFunctions;

let userTestFunction = `function superCounter(string) {
  var stringProperties = {
    "words": string.split(' ').length,
    "letters": 0,
    "spaces": 0,
    "chars": string.split('').length,
    "avgLength": 0
  }
  var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  for (var i=0; i<string.length; i++) {
    if (string[i] === ' ') {
      stringProperties.spaces++;
    } else if (letters.includes(string.toLowerCase()[i])) {
      stringProperties.letters++;
    }
  }
  stringProperties.avgLength+=(stringProperties.letters/stringProperties.words);
  return stringProperties;
}
`;

describe("checkEvalSafety", () => {
    it("should return an object with the passed property equal to false, and a string detailing the reason why the check failed", () => {
        assert.deepEqual({failedTest: true, reason: "Code is missing a function declaration or function expression"},
            checkEvalSafety("var test = functin(x) {return x;}"));
    });
    it("should return an object with a passed property equal to true; this is for testing a basic function declaration using the function keyword", () => {
        assert.deepEqual({failedTest: false, userFunction: "function(x) {return x;}"},
            checkEvalSafety("var test = function(x) {return x;}"));
    });

    it("should return an object with the passed property equal to false, and string detailing the reason for the error", () => {
        assert.deepEqual({failedTest: true, reason: "SyntaxError: Unexpected identifier"},
            checkEvalSafety("var test = function(x) {something fasjdk;}"))
    });

});

describe("evaluateCode", () => {
    it("should return an object with the failedTest property equal to undefined, and an array of passed test cases", () => {
        assert.propertyVal(evaluateCode("function(x) {return x;}", [{input: [3], output: 3}, {input: [5], output: 5}]), "failedTest", false)
    });

    it("should return an object with the failedTest property equal to undefined, and an array of one test case", () => {
        assert.propertyVal(evaluateCode(userTestFunction, [{input: ["Count me in!"], output: {"words": 3, "letters": 9, "spaces": 2, "chars": 12, "avgLength": 3}}]),
            "failedTest", false)
    });

    it("should return an object with the failedTest property equal to undefined, and an array of passed test cases", () => {
        assert.propertyVal(evaluateCode("function(x) {return x;}", [{input: [3], output: 3}, {input: [5], output: 5}]), "failedTest", false)
    });

    it("should return an object with the failedTest property equal to true, and an array of passed test cases", () => {
        assert.propertyVal(evaluateCode("function(x) {return 1;}", [{input: [3], output: 3}, {input: [5], output: 5}]), "failedTest", true)
    })

});