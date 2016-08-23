import xpath = require("xpath");
import xmlDom = require("xmldom");
let parser = xmlDom.DOMParser;
let fs = require("fs");

export default function readTestResultsFromFile(path: String) {
    let unitTestResult;
    let unitTestDescription;
    try {
        let fileData = fs.readFileSync(path, "ascii");
        let doc = new parser().parseFromString(fileData.substring(2, fileData.length));


        let getInt = function (xpathCommand: String) {
            return parseInt(xpath.select("string(" + xpathCommand + ")", doc).toString(), null);
        };

        let testFails = getInt("/testsuite/@failures");
        let testTotal = getInt("/testsuite/@tests");

        unitTestDescription = testTotal - testFails + "/" + testTotal;

        if (testFails >= testTotal) {
            unitTestResult = "failure";
        } else {
            unitTestResult = "success";
        }
    } catch (err) {
        console.log("error reading results");
        console.error(err);
        unitTestDescription = "error reading results: " + err.message;
        unitTestResult = "error";
    }

    return {
        result: unitTestResult,
        description: unitTestDescription,
    };
}

