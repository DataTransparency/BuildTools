var bluebird = require("bluebird");
var GitHubApi = require("github");
 
 let gitHub = new GitHubApi({
            Promise: bluebird,
            debug: true,
            followRedirects: false,
            headers: {
                "user-agent": user,
            },
            host: "api.github.com",
            protocol: "https",
            timeout: 5000,
        });
        gitHub.authenticate({
            token: process.env.GITHUB_TOKEN,
            type: "token",
        });