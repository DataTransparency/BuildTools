#! /usr/bin/env node
import setGitHubStatusFromTestResutsFile from "./setGitHubStatusFromTestResutsFile";
import readTestResultsFromFile from "./readTestResultsFromFile";
import setGitHubStatus from "./setGitHubStatus";
import setGitHubDeploymentStatusWthPayload from "./setGitHubDeploymentStatusWthPayload";

export class Main {
   constructor(public setGitHubStatus: Function, public setGitHubStatusFromTestResutsFile: Function, 
   public readTestResultsFromFile: Function, public setGitHubDeploymentStatusWthPayload: Function)
   {}
}

let me = new Main(setGitHubStatus, setGitHubStatusFromTestResutsFile, readTestResultsFromFile, setGitHubDeploymentStatusWthPayload);
export default me;
let command = process.argv[2];
let newArgs = process.argv.slice(3);
me[command].apply(me, newArgs);
