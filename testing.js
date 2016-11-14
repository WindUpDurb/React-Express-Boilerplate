"use strict";

const assert = require("assert");

module.exports = {
    //for checking whether user-created function is safe to evaluate,
    //and for extracting the function, in case there is extra code;
    checkEvalSafety: function (userCode) {
        if(userCode.indexOf("function") === -1) return {failedTest: true, reason: "Code is missing a function declaration or function expression"};
        let beginningOfFunction = userCode.indexOf("function");
        //in case user has console.logs, other code, comments with } following his function,
        //can keep track of opening { and closing } and record
        //the last, closing } of the function instead
        let endOfFunction = userCode.lastIndexOf("}");

        if (beginningOfFunction === -1 || endOfFunction === -1) return {failedTest: true, reason: "Refractor your function"};

        let extractedFunction = userCode.slice(beginningOfFunction, endOfFunction + 1);

        //error handling in case user/student code is bad
        try {
            eval(`(${extractedFunction})`);
        } catch (error) {
            return {failedTest: true, reason: error.toString()};
        }
        return {failedTest: false, userFunction: extractedFunction};
    },

    //for evaluating the user's function after ensuring it won't break the server
    evaluateCode: function (userFunction, testCases) {
        let evaluations = [], failedTest = false, errorResults;
        //IIFE to avoid any potential variable naming conflicts with user's code;
        (function() {
            let functionToEvaluate = eval(`(${userFunction})`);
            for (let i = 0; i < testCases.length; i++) {
                try {
                    functionToEvaluate(...testCases[i].input);
                } catch (error) {
                    errorResults = {failedTest: true, reason: error.toString()};
                    return;
                }
                //input in an array, so we can spread multiple arguments to the function:
                //Add a try catch for when evaluating?
                let output = functionToEvaluate(...testCases[i].input),
                    expectedOutput = testCases[i].output;

                //for both objects and arrays
                if (typeof expectedOutput === "object") {
                    try {
                        assert.deepEqual(output, expectedOutput);
                    } catch (error) {
                        evaluations.push({output, expectedOutput, result: "failed"});
                        failedTest = true;
                        continue;
                    }
                    evaluations.push({output, expectedOutput, result: "passed"});
                } else {
                    if (output !== expectedOutput) {
                        evaluations.push({output, expectedOutput, result: "failed"});
                        failedTest = true;
                        continue;
                    }
                    evaluations.push({output, expectedOutput, result: "passed"});
                }
            }
        }());
        return errorResults || {evaluations, failedTest};
    }


        ///////////////DRAFT ONE
    /*//probably will want the testCases stored in a database, instead
    //of being sent in the request, as illustrated in the initial schema drafts
    evaluateCode: function (code, testCases, callback) {
        if(code.indexOf("function") === -1) return callback("Needs a function declaration or expression; No arrow functions either", null, true);
        let beginningOfFunction = code.indexOf("function");
        //in case user has console.logs, other code, comments with } following his function,
        //can keep track of opening { and closing } and record
        //the last, closing } of the function instead
        let endOfFunction = code.lastIndexOf("}");

        if(beginningOfFunction === -1 || endOfFunction === -1) return callback("Refractor your function", null, true);

        let extractedFunction = code.slice(beginningOfFunction, endOfFunction + 1);
        let evaluations = [], failedTest;

        //error handling in case user/student code is bad
        try {
            eval(`(${extractedFunction})`);
        } catch (error) {
            return callback(error.toString(), null, true);
        }

        //IIFE to avoid any potential variable naming conflicts with user's code;
        (function() {
            let evaluatedFunction = eval(`(${extractedFunction})`);
            for (let i = 0; i < testCases.length; i++) {
                //input in an array, so we can spread multiple arguments to the function:
                let output = evaluatedFunction(...testCases[i].input),
                    expectedOutput = testCases[i].output;
                console.log("Output: ", output);
                console.log("Function: ", evaluatedFunction);
                if (output !== expectedOutput) {
                    evaluations.push({output, expectedOutput, result: "failed"});
                    failedTest = true;
                }
                if (output === expectedOutput) evaluations.push({output, expectedOutput, result: "passed"});
            }
        }());

        callback(null, evaluations, failedTest);
    }*/
};
