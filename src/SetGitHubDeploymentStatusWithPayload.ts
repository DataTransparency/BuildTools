import {ISetGitHubDeploymentStatus, ISetGitHubDeploymentStatusWithPayload, GitHubDeploymentStatusAPI} from "./types";
import TYPES from "./types";
/// <reference path="../typings/globals/inversify/index.d.ts" />
import {injectable, inject} from "inversify";

import {required, validate, defined} from "./validation";
let fs = require("fs");

function readFileAsync(filename: String): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "ascii", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

@injectable()
class SetGitHubDeploymentStatusWithPayload implements ISetGitHubDeploymentStatusWithPayload {
    private _setGutHubDeploymentStatus: ISetGitHubDeploymentStatus;
    public constructor(@inject(TYPES.iSetGitHubDeploymentStatus) setGutHubDeploymentStatus: ISetGitHubDeploymentStatus){
        this._setGutHubDeploymentStatus = setGutHubDeploymentStatus;
    }
    @defined
    public execute(payloadPath: string, state: string, description: string){
        let that = this;
        return readFileAsync(payloadPath).then(function(bytes){
        let payload: GitHubDeploymentStatusAPI.Payload = JSON.parse(bytes.toString());
        let deployment = payload.deployment;
        let repository = payload.repository;
            return that._setGutHubDeploymentStatus.execute(repository.owner.login, repository.name, deployment.id, state, description);
        })
    }
}

export default SetGitHubDeploymentStatusWithPayload;