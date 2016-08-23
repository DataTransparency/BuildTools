#! /usr/bin/env node

import bluebird = require("bluebird")
var GitHubApi = require("github")

import setGitHubStatusFromTestResutsFile from "./setGitHubStatusFromTestResutsFile"
import readTestResultsFromFile from "./readTestResultsFromFile"
import setGitHubStatus from "./setGitHubStatus"


var gitHub = new GitHubApi({
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

gitHub.authenticate({
    type: "oauth",
    token: process.env.GITHUB_TOKEN
});


export class Main {
   constructor(public gitHub, public setGitHubStatus, public setGitHubStatusFromTestResutsFile, public readTestResultsFromFile){
   }
}


var me = new Main(gitHub, setGitHubStatus,setGitHubStatusFromTestResutsFile,readTestResultsFromFile);
export default me

//is commmandline
var command = process.argv[2]
var newArgs = process.argv.slice(3);

me[command].apply(me, newArgs).done();
