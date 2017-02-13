
import * as interfaces from "./types";
import TYPES from "./types";
import {injectable, inject} from "inversify";

let versionIncrements: Array<string> = ["major", "minor", "patch"];

@injectable()
class CreateGitHubDeployment implements interfaces.ICreateGitHubDeployment {
    private _myAPI: interfaces.IGitHubAPI;
    public constructor(@inject(TYPES.iGitHubAPI) myAPI: interfaces.IGitHubAPI) {
        this._myAPI = myAPI;
    }
    public execute(user: string, repo: string, ref: string, environment: string, versionIncrement: string, required_contexts: string) {
        if (versionIncrements.indexOf(versionIncrement) < 0) {
            throw new Error("Invalid verision_increment: " + versionIncrement);
        }
        if (process.env.LOCATION === "CI") {
            return this._myAPI.repos.createDeployment({
                    owner: user,
                    auto_merge: false,
                    environment: environment,
                    ref: ref,
                    repo: repo,
                    required_contexts: required_contexts.split(","),
                    task: "deploy:" + environment,
                    payload: JSON.stringify({"versionIncrement": versionIncrement})
           });
        } else {
            let p = new Promise<string>(function (resolve, reject) {
                process.nextTick(function(){resolve("Would have created a deployment"); });
            });
            return p;
        }

    }
}
export default CreateGitHubDeployment;
