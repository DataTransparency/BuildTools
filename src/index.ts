#! /usr/bin/env node
import * as interfaces from "./types";
import TYPES from "./types";

declare var process;
import "reflect-metadata";
import k from "./inversify.run.config";

let me = {
    "setGitHubDeploymentStatus": k.get<interfaces.ISetGitHubDeploymentStatus>(
        TYPES.iSetGitHubDeploymentStatus),
    "setGitHubDeploymentStatusWithPayload": k.get<interfaces.ISetGitHubDeploymentStatusWithPayload>(
        TYPES.iSetGitHubDeploymentStatusWithPayload),
    "setGitHubStatus": k.get<interfaces.ISetGitHubStatus>(
        TYPES.iSetGitHubStatus),
    "setGitHubStatusFromTestResutsFile": k.get<interfaces.ISetGitHubStatusFromTestResutsFile>(
        TYPES.iSetGitHubStatusFromTestResutsFile),
    "getVersionFromPayload": k.get<interfaces.IGetVersionFromPayload>(
        TYPES.iGetVersionFromPayload),   
    "createGitHubDeployment": k.get<interfaces.ICreateGitHubDeployment>(
        TYPES.iCreateGitHubDeployment),
};

let newArgs = process.argv.slice(3);
let command = process.argv[2];
me[command].execute.apply(me[command], newArgs).then(function(result){
    process.stdout.write(result.toString());
    return 1;
}).catch(function(error){
    console.error(error);
    return 0;
})