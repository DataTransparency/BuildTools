#! /usr/bin/env node
import * as interfaces from "./types";
import TYPES from "./types";
import commander = require("commander");

declare var process;
import "reflect-metadata";
import k from "./inversify.run.config";

import pjson = require("pjson");

let me = {
    "SetGitHubDeploymentStatus": k.get<interfaces.ISetGitHubDeploymentStatus>(
        TYPES.iSetGitHubDeploymentStatus).execute,
    "SetGitHubDeploymentStatusWthPayload": k.get<interfaces.ISetGitHubDeploymentStatusWthPayload>(
        TYPES.iSetGitHubDeploymentStatusWthPayload).execute,
    "SetGitHubStatus": k.get<interfaces.ISetGitHubStatus>(
        TYPES.iSetGitHubStatus).execute,
    "SetGitHubStatusFromTestResutsFile": k.get<interfaces.ISetGitHubStatusFromTestResutsFile>(
        TYPES.iSetGitHubStatusFromTestResutsFile).execute,
}
export default me;

let newArgs = process.argv.slice(4);

commander
    .version(pjson.version)
    .command("sgds [user] [repo] [commit] [context] [state] [description] [url]", "SetGitHubDeploymentStatus")
    .action(function (cmd, env) {
        me.SetGitHubDeploymentStatus.apply(me, newArgs);
    })
    .command("sgdsp [payload] [state] [descrioption]", "SetGitHubDeploymentStatusWthPayload")
    .action(function (cmd, env) {
        me.SetGitHubDeploymentStatusWthPayload.apply(me, newArgs);
    })
    .command("sgs", "SetGitHubStatus")
    .action(function (cmd, env) {
        me.SetGitHubStatus.apply(me, newArgs);
    })
    .command("sgst", "SetGitHubStatusFromTestResutsFile")
    .action(function (cmd, env) {
        me.SetGitHubStatusFromTestResutsFile.apply(me, newArgs);
    })
    .parse(process.argv);