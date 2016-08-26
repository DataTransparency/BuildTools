import { Kernel } from "inversify";
import * as interfaces from "./types";
import {GitHubDeploymentStatusAPI} from "./types";
import TYPES from "./types";

import SetGitHubDeploymentStatus from "./SetGitHubDeploymentStatus";
import SetGitHubDeploymentStatusWthPayload from "./SetGitHubDeploymentStatusWthPayload";
import SetGitHubStatus from "./SetGitHubStatus";
import SetGitHubStatusFromTestResutsFile from "./SetGitHubStatusFromTestResutsFile";
import ReadTestResultsFromFile from "./ReadTestResultsFromFile";

import GitHubApi = require("github");

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "James Wood"
    },
    Promise: Promise,
    followRedirects: false,
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_TOKEN
});

let kernel = new Kernel();
kernel.bind<interfaces.IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(github);
kernel.bind<interfaces.ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus).to(SetGitHubDeploymentStatus);
kernel.bind<interfaces.ISetGitHubDeploymentStatusWthPayload>(TYPES.iSetGitHubDeploymentStatusWthPayload).to(SetGitHubDeploymentStatusWthPayload);
kernel.bind<interfaces.ISetGitHubStatus>(TYPES.iSetGitHubStatus).to(SetGitHubStatus);
kernel.bind<interfaces.IReadTestResultsFromFile>(TYPES.iReadTestResultsFromFile).toConstantValue(ReadTestResultsFromFile);
kernel.bind<interfaces.ISetGitHubStatusFromTestResutsFile>(TYPES.iSetGitHubStatusFromTestResutsFile).to(SetGitHubStatusFromTestResutsFile);

export default kernel;
