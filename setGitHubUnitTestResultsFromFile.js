module.exports = function setGitHubUnitTestResultsFromFile(user, repo, revision, fileName, context, url){
		
		var results = this.readTestResults(fileName);

		url = url || process.env.BUILD_URL;

		var state = results.result;
		var description = results.description;

		return this.setStatus(user, repo, revision, context, state, description, url)
}
