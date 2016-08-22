module.exports = function setUnitTestResultsFromFile(user, repo, revision, fileName, url){
		
		var results = this.readTestResults(fileName);

		var context = 'unit tests';
		url = url || process.env.BUILD_URL;

		var state = results.result;
		var description = results.description;

		return this.setStatus(user, repo, revision, context, state, description, url)
}
