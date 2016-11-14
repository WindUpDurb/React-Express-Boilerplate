"use strict";

const express = require("express");
const router = express.Router();
const Evaluation = require("../../testing");

let challenge1 = {
    argumentsIDE: "x, y",
    functionName: "sumNumbers",
    challengeId: "1",
    testCases: [{input: [1, 5], output: 6}, {input: [15, 20,], output: 35}],
    description: "Please complete the sumNumbers function, which takes two arguments, each a number, and returns the sum."
};

let challenge2 = {
    argumentsIDE: "boolean",
    functionName: "returnObjectTest",
    challengeId: "2",
    testCases: [{input: [true], output: {testKey: true}}, {input: [false], output: {testKey: false}}],
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