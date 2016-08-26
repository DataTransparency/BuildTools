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
    public execute(user: String, repo: String, revision: String, fileName: String, context: String, url: String) {
        return this._readTestResultsFromFile.execute(fileName)
        .then(function (results) {
            url = url || process.env.BUILD_URL;
            let state = results.result;
            let description = results.description;
            return this.setGitHubStatus(user, repo, revision, context, state, description, url);
        });
    }
}
export default SetGitHubStatusFromTestResutsFile;