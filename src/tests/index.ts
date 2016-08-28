import "reflect-metadata";

import SetGitHubDeploymentStatus = require("./SetGitHubDeploymentStatus");
import SetGitHubDeploymentStatusWithPayload = require("./SetGitHubDeploymentStatusWithPayload");
import SetGitHubStatus = require("./SetGitHubStatus");
import GetVersionFromPayload = require("./GetVersionFromPayload");
import ReadTestResultsFromFile = require("./ReadTestResultsFromFile");
import SetGitHubStatusFromTestResutsFile = require("./SetGitHubStatusFromTestResutsFile");

export {SetGitHubDeploymentStatusWithPayload, SetGitHubStatus, GetVersionFromPayload, SetGitHubDeploymentStatus, ReadTestResultsFromFile,SetGitHubStatusFromTestResutsFile};