import {ISetGitHubStatus, IGitHubAPI} from "./types";
import TYPES from "./types";
import {injectable, inject} from "inversify";

let statuses: Array<string> = ["pending", "success", "failure", "error"];

@injectable()
class SetGitHubStatus implements ISetGitHubStatus {
    private _myAPI: IGitHubAPI;
    public constructor(@inject(TYPES.iGitHubAPI) myAPI: IGitHubAPI){
        this._myAPI = myAPI;
    }
    public execute(user: string, repo: string, commit: string, context: string, state: string, description: string, url: string) {
        if (statuses.indexOf(state)<0) {
            throw new Error("Invalid State: " + state);
        }
        return this._myAPI.repos.createStatus({
        user: user,
        repo: repo,
        sha: commit,
        state: state,
        context: context,
        description: description,
        target_url: url,
    });
    }
}
export default SetGitHubStatus;