import { Kernel } from "inversify";
import TYPES from "./types";
import { setGitHubDeploymentStatusWithPayload} from "./setGitHubDeploymentStatusWithPayload";
var kernel = new Kernel();
kernel.bind<setGitHubDeploymentStatusWithPayload>(TYPES.setGitHubDeploymentStatusWithPayload).to(setGitHubDeploymentStatusWithPayload);
export default kernel;