var xpath = require('xpath');
var parser = require('xmldom').DOMParser;
var fs = require('fs');
var unitTestResult;
var unitTestDescription;

try
{
	var fileData = fs.readFileSync('test.xml', 'ascii');
	var doc = new parser().parseFromString(fileData.substring(2, fileData.length));


	var getInt = function(path){
		return parseInt(xpath.select("string(" + path +")", doc).toString());
	}

	var testFails = getInt("/testsuite/@failures");
	var testTotal = getInt("/testsuite/@tests");

	unitTestDescription = testTotal-testFails+"/"+testTotal;

	 if(testFails>==testTotal){
	 	unitTestResult = 'failure';
	 }
	 else
	 {
	 	unitTestResult = 'success';
	 }
}
catch
{
	unitTestDescription = "error reading results";
	unitTestResult = 'error';
}

return {
	result: unitTestResult
	description: unitTestDescription
}