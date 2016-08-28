import * as interfaces from "./types";
import TYPES from "./types";
import {injectable, inject} from "inversify";

@injectable()
class SetGitHubStatusFromTestResutsFile implements interfaces.ISetGitHubStatusFromTestResutsFile {
    private _readTestResultsFromFile: interfaces.IReadTestResultsFromFile;
    private _setGitHubStatus: interfaces.ISetGitHubStatus;

    public constructor(@inject(TYPES.iReadTestResultsFromFile) readTestResultsFromFile: interfaces.IReadTestResultsFromFile,
        @inject(TYPES.iSetGitHubStatus) setGitHubStatus: interfaces.ISetGitHubStatus){
        this._readTestResultsFromFile = readTestResultsFromFile;
        this._setGitHubStatus = setGitHubStatus;
    }
    public execute(user: string, repo: string, revision: string, fileName: string, context: string, url: string) {
        let that = this;
        url = url || process.env.BUILD_URL;
        return this._readTestResultsFromFile.execute(fileName)
        .catch(function(err){
            return that._setGitHubStatus.execute(user, repo, revision, context, "error", err.message, url);
        }).then(function (results) {
            let state = results.result;
            let description = results.description;
            return that._setGitHubStatus.execute(user, repo, revision, context, state, description, url);
        });
    }
}
export default SetGitHubStatusFromTestResutsFile;