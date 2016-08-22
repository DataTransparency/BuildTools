#! /usr/bin/env node



var path = '';
if (process.env.WORKSPACE){
	path = process.env.WORKSPACE + "/node_modules/";
}

var bluebird = require(path + "bluebird");
var GitHubApi = require(path+ "github");


var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "Classfitter" // GitHub is happy with a unique user agent
    },
    Promise: bluebird,
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_TOKEN
});

var me = {
	github:github,
	reqire: function(req){return require(path + req)},
	setStatus: require('./setStatus.js'),
	setUnitTestResultsFromFile: require('./setUnitTestResultsFromFile.js'),
	readTestResults: require('./readTestResults.js'),
	setGitHubCoveraveStatusFromFile: equire('./setGitHubCoveraveStatusFromFile.js'),
}

module.exports = me;

//is commmandline
var command = process.argv[2]
var newArgs = process.argv.slice(3);

if (me[command])
{
	return me[command].apply(me, newArgs).done()
}
else
{
	return "unknown command: " + command;
	return 0
}

//me[command].call(process.argv.slice[2]);


