import * as interfaces from "./types";
import TYPES from "./types";
import {injectable, inject} from "inversify";

import {required, validate, defined} from "./validation";

import xpath = require("xpath");
import xmlDom = require("xmldom");
let parser = xmlDom.DOMParser;
let fs = require("fs");

function readFileAsync(filename: String): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "ascii", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

@injectable()
class ReadTestResultsFromFile implements interfaces.IReadTestResultsFromFile {
    @defined
    public execute(path: string): Promise<interfaces.ITestResult> {
        let unitTestResult: string;
        let unitTestDescription: string;
        return readFileAsync(path).then(function (fileData) {
            let doc = new parser().parseFromString(fileData.substring(2, fileData.length));
            let getInt = function (xpathCommand: string) {
                return parseInt(xpath.select("string(" + xpathCommand + ")", doc).toString(), null);
            };
            let testFails = getInt("/testsuite/@failures");
            let testErrors = getInt("/testsuite/@errors");
            let testTotal = getInt("/testsuite/@tests");
            let testPassed = testTotal - testFails - testErrors;

            unitTestDescription = testPassed + "/" + testTotal;
            if (testPassed === testTotal) {
                unitTestResult = "success";
            } else {
                unitTestResult = "failure";
            }
        }).catch(function (err) {
            unitTestDescription = "error reading results: " + err.message;
            unitTestResult = "error";
        }).then(function () {
            return {
                result: unitTestResult,
                description: unitTestDescription,
            };
        })
    }
}

export default ReadTestResultsFromFile;
