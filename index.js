var bluebird = require(process.env.WORKSPACE + "/node_modules/bluebird");
var GitHubApi = require(process.env.WORKSPACE +"/node_modules/github");


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



var updateDeploymentStatus = function updateDeploymentStatus(status){
	var payload = JSON.parse(process.env.payload);
	var deployment = payload.deployment;
	var deploymentType = deployment.type

	console.log("Deploying " + deployment.sha + " from " + deployment.ref + " into " + deployment.environment + " environment for " + deployment.creator.login);
	console.log("Description: " + deployment.description);

	if(deployment.task==='deploy')
	{
		console.log("Requesting deployment status to 'pending'");
		return github.repos.createDeploymentStatus({
				user:usr,
				repo:repo,
				id: deployment.id,
				state:STATE_PENDING,
				description:"Deployment started"
		})
		.then(function(){
			console.log("Succeded in setting deployment status");
		})
	}
	else {
		console.log('Was not a depolyment task')
		return -1;
	}
}



return updateDeploymentStatus(STATE_PENDING).done()


/*

return github.repos.getDeployments({
	user:usr,
	repo:repo,
	ref:branchName
}).then(function(deployments){
	return deployments.filter(function(deployment){
		return deployment.task =='deploy' && deployment.payload;
	});
}).each(function(deployment){
	console.log(deployment.id);
	return github.repos.getDeploymentStatuses({
		user:usr,
		repo:repo,
		id:deployment.id
	}).then(function(statuses){
		console.log("statuses");
		console.dir(statuses);
		if(statuses.length===0)
		{
			unbiltDeployments.push(deployment)
		}
	});
}).then(function(){
	if(unbiltDeployments.length >= 1){
		deploymentToBuild=unbiltDeployments[0];
		console.log('Deploying' + deploymentToBuild.payload.version);

*/