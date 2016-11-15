"use strict";

const express = require("express");
const router = express.Router();
const Evaluation = require("../../testing");

let challenge1 = {
    title: "Sum Numbers",
    argumentsIDE: "x, y",
    functionName: "sumNumbers",
    challengeId: "1",
    testCases: [
        {input: [2, 7], output: 9, inputString: "2 7", expectedOutputString: "9"},
        {input: [10, 20,], output: 30, inputString: "10 20", expectedOutputString: "30"}
        ],
    sampleOutput: ["6", "35"],
    sampleInput: ["1 5", "15 20"],
    outputFormat: ["Return a single integer, as represented on the two lines of the sample output with the given sample input respectively."],
    inputFormat: ["The first line contains two space-separated integers representing the respective values the sumNumbers function will take as input.",
        "The second line contains two space-separated integers representing the respective values the sumNumbers function will take as input."],
    description: "Please complete the sumNumbers function, which takes two arguments, each a number, and returns the sum."
};

let challenge2 = {
    title: "Object Analysis Test",
    argumentsIDE: "boolean",
    functionName: "returnObjectTest",
    challengeId: "2",
    testCases: [
        {input: [true], output: {testKey: true}, inputString: "true", expectedOutputString: "{testKey: true}"},
        {input: [false], output: {testKey: false}, inputString: "false", expectedOutputString: "{testKey: false}"}
        ],
    sampleInput: ["true", "false"],
    sampleOutput: ["{testKey: true}", "{testKey: false}"],
    inputFormat: ["The first line contains a boolean value representing the value the returnObjectTest function will take as input.",
        "The second line contains a boolean value representing the value the returnObjectTest function will take as input."],
    outputFormat: [`Return an object literal containing a single property with a key of "testKey" and a value of the boolean input, as represented on the lines of the sample output with the given sample input respectively.`],
    description: "Please complete the returnObjectTest function, which takes a single argument, a boolean, and returns an object with a single property. The key for the property should be testKey and the value is the inputted boolean."
};

router.get("/", (request, response) => {
    response.send("Connected");
});

router.post("/retrieveChallenge", (request, response) => {
    console.log("Request.body: ", request.body);
    let challengeDetails;
    if (request.body.challengeId == 1) challengeDetails = challenge1;
    if (request.body.challengeId == 2) challengeDetails = challenge2;
    response.send(challengeDetails);
});

router.post("/evaluateSubmission", (request, response) => {
    let {userSubmission, challengeDetails} = request.body;
    let safetyResults = Evaluation.checkEvalSafety(userSubmission);
    if (safetyResults.failedTest) return response.send(safetyResults);
    let evaluationResults = Evaluation.evaluateCode(safetyResults.userFunction, challengeDetails.testCases);
    console.log("Evaluation results: ", evaluationResults);
    response.send(evaluationResults)
});

module.exports = router;