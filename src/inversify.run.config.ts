import { Kernel } from "inversify";
import {ISetGitHubDeploymentStatusWthPayload, ISetGitHubDeploymentStatus} from "./types";
import TYPES from "./types";

//import SetGitHubDeploymentStatusWthPayload from "./SetGitHubDeploymentStatusWthPayload";
import {SetGitHubDeploymentStatus} from "./SetGitHubDeploymentStatus";
let kernel = new Kernel();
//kernel.bind<ISetGitHubDeploymentStatusWthPayload>(TYPES.ISetGitHubDeploymentStatusWthPayload).to(SetGitHubDeploymentStatusWthPayload);
kernel.bind<ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus).to(SetGitHubDeploymentStatus);

export default kernel;
