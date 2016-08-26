import {ISetGitHubDeploymentStatus, ISetGitHubDeploymentStatusWthPayload, GitHubDeploymentStatusAPI} from "./types";
import TYPES from "./types";
/// <reference path="../typings/globals/inversify/index.d.ts" />
import {injectable, inject} from "inversify";

@injectable()
class SetGitHubDeploymentStatusWthPayload implements ISetGitHubDeploymentStatusWthPayload {
    private _setGutHubDeploymentStatus: ISetGitHubDeploymentStatus;
    public constructor(@inject(TYPES.iSetGitHubDeploymentStatus) setGutHubDeploymentStatus: ISetGitHubDeploymentStatus){
        this._setGutHubDeploymentStatus = setGutHubDeploymentStatus;
    }

    public execute(payloadString: string, state: string, description: string){
        let payload: GitHubDeploymentStatusAPI.Payload = JSON.parse(payloadString);
        let deployment = payload.deployment;
        let repository = payload.repository;
        return this._setGutHubDeploymentStatus.execute(repository.owner.login, repository.name, deployment.id, state, description);
    }
}

export default SetGitHubDeploymentStatusWthPayload;