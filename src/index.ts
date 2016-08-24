#! /usr/bin/env node
import setGitHubStatusFromTestResutsFile from "./setGitHubStatusFromTestResutsFile";
import readTestResultsFromFile from "./readTestResultsFromFile";
import setGitHubStatus from "./setGitHubStatus";

export class Main {
   constructor(
   public setGitHubStatus: (user: String, repo: String, revision: String, context: String, state: String, description: String, url: String)=>void,
   public setGitHubStatusFromTestResutsFile: Function, 
   public readTestResultsFromFile: Function){}
}

let me = new Main(setGitHubStatus, setGitHubStatusFromTestResutsFile, readTestResultsFromFile);
export default me;
let command = process.argv[2];
let newArgs = process.argv.slice(3);
me[command].apply(me, newArgs);
