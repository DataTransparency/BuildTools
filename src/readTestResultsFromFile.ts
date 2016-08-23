import xpath = require("xpath");
import xmlDom = require("xmldom");
var parser = xmlDom.DOMParser;
var fs = require('fs');

export default function readTestResultsFromFile(path: String){
	var unitTestResult;
	var unitTestDescription;
	try
	{
		var fileData = fs.readFileSync(path, 'ascii');
		var doc = new parser().parseFromString(fileData.substring(2, fileData.length));


		var getInt = function(path){
			return parseInt(xpath.select("string(" + path +")", doc).toString());
		}

		var testFails = getInt("/testsuite/@failures");
		var testTotal = getInt("/testsuite/@tests");

		unitTestDescription = testTotal-testFails+"/"+testTotal;

		 if(testFails>=testTotal){
		 	unitTestResult = 'failure';
		 }
		 else
		 {
		 	unitTestResult = 'success';
		 }
	}
	catch (err)
	{
		console.log('error reading results');
		console.error(err);
		unitTestDescription = "error reading results: " + err.message;
		unitTestResult = 'error';
	}

	return {
		result:unitTestResult,
		description:unitTestDescription
	}
}

