var bluebird = require("bluebird");
var GitHubApi = require("github");

console.log("Hello World");

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "James Wood"
    },
    Promise: bluebird,
    followRedirects: false,
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_TOKEN
});



var usr = 'classfitter';
var repo = "classfitter";
var branchName = 'issue-3-update-coding-style';
var version = 'v0.0.1-test';
var required_contexts=['test']
var environment='test'

return github.repos.createDeployment({
		user:usr,
		repo:repo,
		ref:branchName,
		required_contexts: required_contexts,
		payload:JSON.stringify({version: version}),
		environment: environment,
		description:`Deployment of ${version} to ${environment} from ${branchName}`
}).then(function(){
 	return github.repos.getDeployments({
		user:'Classfitter',
		repo:'Classfitter',
		ref:branchName
	});
}).catch(function(error){
	console.log("There was an error");
	console.dir(error);
}).done()
