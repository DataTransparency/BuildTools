var bluebird = require("bluebird");
var GitHubApi = require("github");

console.log("Hello World");

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "James Wood" // GitHub is happy with a unique user agent
    },
    Promise: bluebird,
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

github.authenticate({
    type: "basic",
    username: 'jamesjwood',
    password: 'nX5-99D-ovn-cUX'
});

var branchName = 'issue-3-update-coding-style';

var usr = 'classfitter';
var repo = "classfitter";

var STATE_PENDING='pending';

return github.repos.createDeployment({
		user:usr,
		repo:repo,
		ref:branchName,
		required_contexts:['test'],
		payload:JSON.stringify({version:'v0.0.1-test'}),
		environment:'test',
		description:'Deployment to test requested'
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
