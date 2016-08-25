export interface ISetGitHubDeploymentStatusWthPayload {
   (payloadString: string, state: string, description: string): any;
}

let TYPES = {
    ISetGitHubDeploymentStatusWthPayload: Symbol("ISetGitHubDeploymentStatusWthPayload"),
};

export default TYPES;


