import cftool from "./index"
import readTestResultsFromFile from "./readTestResultsFromFile"

export default function setGitHubStatusFromTestResutsFile(user: String, repo: String, revision: String, fileName: String, context: String, url:String){
		var results = readTestResultsFromFile(fileName)
		url = url || process.env.BUILD_URL
		var state = results.result
		var description = results.description
		return cftool.setGitHubStatus(user, repo, revision, context, state, description, url)
}