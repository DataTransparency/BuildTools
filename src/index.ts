#! /usr/bin/env node
import setGitHubStatus from "./setGitHubStatus";
import setGitHubStatusFromTestResutsFile from "./setGitHubStatusFromTestResutsFile";
import readTestResultsFromFile from "./readTestResultsFromFile";

import {ISetGitHubDeploymentStatus, ISetGitHubDeploymentStatusWthPayload} from "./types";

import TYPES from "./types";
declare var process;

import "reflect-metadata";
import k from "./inversify.run.config";

let me = {
    "SetGitHubDeploymentStatus": k.get<ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus).execute,
    "SetGitHubDeploymentStatusWthPayload": k.get<ISetGitHubDeploymentStatusWthPayload>(TYPES.iSetGitHubDeploymentStatusWthPayload).execute
}
export default me;
let command = process.argv[2];
let newArgs = process.argv.slice(3);

me[command].apply(me, newArgs);
