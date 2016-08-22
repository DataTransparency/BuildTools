

var path = '';

if (process.env.WORKSPACE){
	path = process.env.WORKSPACE + "/node_modules/";
}

var bluebird = require(path + "bluebird");
var GitHubApi = require(path+ "github");


var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "Classfitter" // GitHub is happy with a unique user agent
    },
    Promise: bluebird,
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_TOKEN
});

var setStatus = function setStatus(usr, repo, sha, state, context, description){

	return github.repos.createStatus({
				user:usr,
				repo:repo,
				sha:sha,
				state:state,
				context:context,
				description:description
	})
	.then(function(){
			console.log("Succeded in setting deployment status");
	})
}

return setStatus('classfitter','classfitter', process.env.GIT_REVISION || '54facef372a09348a2a924a169c6ccb1bb383c39','pending','tests','pending...').done()
