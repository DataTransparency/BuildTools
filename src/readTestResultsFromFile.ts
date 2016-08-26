import * as interfaces from "./types";
import TYPES from "./types";
import {injectable, inject} from "inversify";

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
class ReadTestResultsFromFile implements interfaces.IReadTestResultsFromFile{
    public execute(path: String) {
        let unitTestResult: String;
        let unitTestDescription: String;
        return readFileAsync(path).then(function (fileData) {
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
        }).catch(function (err) {
            console.log("error reading results");
            console.error(err);
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


