let GitHubApi = require("github");
import bluebird = require("bluebird");

export default function setGitHubStatus(user: String, repo: String, revision: String, context: String, state: String, description: String, url: String) {
    let gitHub = new GitHubApi({
        Promise: bluebird,
        debug: true,
        followRedirects: false,
        headers: {
            "user-agent": "Classfitter",
        },
        host: "api.github.com",
        protocol: "https",
        timeout: 5000,
    });
    gitHub.authenticate({
        token: process.env.GITHUB_TOKEN,
        type: "token",
    });
    if (description.length > 140) {
        description = description.slice(0, 140)
    }

    return gitHub.repos.createStatus({
        user: user,
        repo: repo,
        sha: revision,
        state: state,
        context: context,
        description: description,
        target_url: url,
    });
}