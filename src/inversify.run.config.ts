import { Kernel } from "inversify";
import * as interfaces from "./types";
import {GitHubDeploymentStatusAPI} from "./types";
import TYPES from "./types";

import SetGitHubDeploymentStatus from "./SetGitHubDeploymentStatus";
import SetGitHubDeploymentStatusWithPayload from "./SetGitHubDeploymentStatusWithPayload";
import SetGitHubStatus from "./SetGitHubStatus";
import SetGitHubStatusFromTestResutsFile from "./SetGitHubStatusFromTestResutsFile";
import ReadTestResultsFromFile from "./ReadTestResultsFromFile";
import GetVersionFromPayload from "./GetVersionFromPayload";

let GitHubApi = require("github");

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "Deployment Service",
    },
    Promise: Promise,
    followRedirects: false,
    timeout: 5000
});

github.authenticate({
    token: process.env.GITHUB_TOKEN,
    type: "token",
});

let kernel = new Kernel();
kernel.bind<interfaces.IGitHubAPI>(
    TYPES.iGitHubAPI).toConstantValue(github);
kernel.bind<interfaces.ISetGitHubDeploymentStatus>(
    TYPES.iSetGitHubDeploymentStatus).to(SetGitHubDeploymentStatus);
kernel.bind<interfaces.ISetGitHubDeploymentStatusWithPayload>(
    TYPES.iSetGitHubDeploymentStatusWithPayload).to(SetGitHubDeploymentStatusWithPayload);
kernel.bind<interfaces.ISetGitHubStatus>(
    TYPES.iSetGitHubStatus).to(SetGitHubStatus);
kernel.bind<interfaces.IReadTestResultsFromFile>(
    TYPES.iReadTestResultsFromFile).to(ReadTestResultsFromFile);
kernel.bind<interfaces.ISetGitHubStatusFromTestResutsFile>(
    TYPES.iSetGitHubStatusFromTestResutsFile).to(SetGitHubStatusFromTestResutsFile);
kernel.bind<interfaces.IGetVersionFromPayload>(
    TYPES.iGetVersionFromPayload).to(GetVersionFromPayload);
export default kernel;
