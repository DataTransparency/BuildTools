import cftool from "./index";
import readTestResultsFromFile from "./readTestResultsFromFile";

export default function setGitHubStatusFromTestResutsFile(user: String,
repo: String, revision: String, fileName: String, context: String, url: String) {
    return readTestResultsFromFile(fileName)
        .then(function (results) {
            url = url || process.env.BUILD_URL;
            let state = results.result;
            let description = results.description;
            return cftool.setGitHubStatus(user, repo, revision, context, state, description, url);
        });
}
