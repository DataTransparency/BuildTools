import {ISetGitHubDeploymentStatus, IGitHubAPI} from "./types";
import TYPES from "./types";
import {injectable, inject} from "inversify";

let statuses = ["pending", "success", "failure", "error"];

@injectable()
class SetGitHubDeploymentStatus implements ISetGitHubDeploymentStatus {

    private _myAPI: IGitHubAPI;
    public constructor(@inject(TYPES.iGitHubAPI) myAPI: IGitHubAPI){
        this._myAPI = myAPI;
    }
    public execute(user: string, repo: string, id: number, state: string, description: string) {
        if (statuses.indexOf(state)<0) {
            throw new Error("Invalid State: " + state);
        }
        return this._myAPI.repos.createDeploymentStatus({
            user: user,
            repo: repo,
            id: id,
            state: state,
            description: description
        })
    }
}

export {SetGitHubDeploymentStatus};