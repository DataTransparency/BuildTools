let GitHubApi = require("github");
import bluebird = require("bluebird");



let statuses = ["pending", "success", "failure","error"]

export default function setGitHubDeploymentStatus(user: string, repo: string, deploymentId: number, state: string, description: string) {
    if (!statuses[state]) {
        throw new Error("Invalid State: " + state);
    }
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
    return gitHub.repos.createDeploymentStatus({
        user: user,
        repo: repo,
        id: deploymentId,
        state: state,
        description: description
    })
}