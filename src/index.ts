#! /usr/bin/env node

import bluebird = require("bluebird");
let GitHubApi = require("github");

import setGitHubStatusFromTestResutsFile from "./setGitHubStatusFromTestResutsFile";
import readTestResultsFromFile from "./readTestResultsFromFile";
import setGitHubStatus from "./setGitHubStatus";

let gitHub = new GitHubApi({
    // optional
    Promise: bluebird,
    debug: true,
    followRedirects: false,
    headers: {
        "user-agent": "Classfitter",
    },
    host: "api.github.com",
    protocol: "https",
    timeout: 5000,
});

gitHub.authenticate({
    token: process.env.GITHUB_TOKEN,
    type: "token",
});

export class Main {
   constructor(public gitHub, public setGitHubStatus, public setGitHubStatusFromTestResutsFile, public readTestResultsFromFile) {
   }
}

let me = new Main(gitHub, setGitHubStatus, setGitHubStatusFromTestResutsFile, readTestResultsFromFile);
export default me;

// is commmandline
let command = process.argv[2];
let newArgs = process.argv.slice(3);

me[command].apply(me, newArgs).done();
