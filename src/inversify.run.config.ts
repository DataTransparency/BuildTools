import { Kernel } from "inversify";
import * as interfaces from "./types";
import TYPES from "./types";

import SetGitHubDeploymentStatus from "./SetGitHubDeploymentStatus";
import SetGitHubDeploymentStatusWthPayload from "./SetGitHubDeploymentStatusWthPayload";
import SetGitHubStatus from "./SetGitHubStatus";

let kernel = new Kernel();
kernel.bind<interfaces.ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus).to(SetGitHubDeploymentStatus);
kernel.bind<interfaces.ISetGitHubDeploymentStatusWthPayload>(TYPES.iSetGitHubDeploymentStatusWthPayload).to(SetGitHubDeploymentStatusWthPayload);
kernel.bind<interfaces.ISetGitHubStatus>(TYPES.iSetGitHubStatus).to(SetGitHubStatus);
export default kernel;
