import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");
/// <reference path="../../typings/globals/inversify/index.d.ts" />

import SetGitHubDeploymentStatusWthPayload from "../SetGitHubDeploymentStatusWthPayload";
import { Kernel, interfaces } from "inversify";


import TYPES from "../types";
import {ISetGitHubDeploymentStatus, ISetGitHubDeploymentStatusWthPayload} from "../types";

var payloadString = JSON.stringify(
    {
    "deployment": {
        "url": "https://api.github.com/repos/Classfitter/Classfitter/deployments/9383106",
        "id": 9383106,
        "sha": "af272ec6996786787b5b2200093f10245add88ed",
        "ref": "issue-3-update-coding-style",
        "task": "deploy",
        "payload": "{\"version\":\"v0.0.1-test\"}",
        "environment": "test",
        "description": "Deployment to test requested",
        "creator": {
            "login": "jamesjwood",
            "id": 1565708,
            "avatar_url": "https://avatars.githubusercontent.com/u/1565708?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/jamesjwood",
            "html_url": "https://github.com/jamesjwood",
            "followers_url": "https://api.github.com/users/jamesjwood/followers",
            "following_url": "https://api.github.com/users/jamesjwood/following{/other_user}",
            "gists_url": "https://api.github.com/users/jamesjwood/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/jamesjwood/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/jamesjwood/subscriptions",
            "organizations_url": "https://api.github.com/users/jamesjwood/orgs",
            "repos_url": "https://api.github.com/users/jamesjwood/repos",
            "events_url": "https://api.github.com/users/jamesjwood/events{/privacy}",
            "received_events_url": "https://api.github.com/users/jamesjwood/received_events",
            "type": "User",
            "site_admin": false
        },
        "created_at": "2016-08-20T22:52:21Z",
        "updated_at": "2016-08-20T22:52:21Z",
        "statuses_url": "https://api.github.com/repos/Classfitter/Classfitter/deployments/9383106/statuses",
        "repository_url": "https://api.github.com/repos/Classfitter/Classfitter"
    },
    "repository": {
        "id": 62835278,
        "name": "Classfitter",
        "full_name": "Classfitter/Classfitter",
        "owner": {
            "login": "Classfitter",
            "id": 21082882,
            "avatar_url": "https://avatars.githubusercontent.com/u/21082882?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/Classfitter",
            "html_url": "https://github.com/Classfitter",
            "followers_url": "https://api.github.com/users/Classfitter/followers",
            "following_url": "https://api.github.com/users/Classfitter/following{/other_user}",
            "gists_url": "https://api.github.com/users/Classfitter/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/Classfitter/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/Classfitter/subscriptions",
            "organizations_url": "https://api.github.com/users/Classfitter/orgs",
            "repos_url": "https://api.github.com/users/Classfitter/repos",
            "events_url": "https://api.github.com/users/Classfitter/events{/privacy}",
            "received_events_url": "https://api.github.com/users/Classfitter/received_events",
            "type": "Organization",
            "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/Classfitter/Classfitter",
        "description": "Classfitter Project",
        "fork": false,
        "url": "https://api.github.com/repos/Classfitter/Classfitter",
        "forks_url": "https://api.github.com/repos/Classfitter/Classfitter/forks",
        "keys_url": "https://api.github.com/repos/Classfitter/Classfitter/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/Classfitter/Classfitter/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/Classfitter/Classfitter/teams",
        "hooks_url": "https://api.github.com/repos/Classfitter/Classfitter/hooks",
        "issue_events_url": "https://api.github.com/repos/Classfitter/Classfitter/issues/events{/number}",
        "events_url": "https://api.github.com/repos/Classfitter/Classfitter/events",
        "assignees_url": "https://api.github.com/repos/Classfitter/Classfitter/assignees{/user}",
        "branches_url": "https://api.github.com/repos/Classfitter/Classfitter/branches{/branch}",
        "tags_url": "https://api.github.com/repos/Classfitter/Classfitter/tags",
        "blobs_url": "https://api.github.com/repos/Classfitter/Classfitter/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/Classfitter/Classfitter/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/Classfitter/Classfitter/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/Classfitter/Classfitter/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/Classfitter/Classfitter/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/Classfitter/Classfitter/languages",
        "stargazers_url": "https://api.github.com/repos/Classfitter/Classfitter/stargazers",
        "contributors_url": "https://api.github.com/repos/Classfitter/Classfitter/contributors",
        "subscribers_url": "https://api.github.com/repos/Classfitter/Classfitter/subscribers",
        "subscription_url": "https://api.github.com/repos/Classfitter/Classfitter/subscription",
        "commits_url": "https://api.github.com/repos/Classfitter/Classfitter/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/Classfitter/Classfitter/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/Classfitter/Classfitter/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/Classfitter/Classfitter/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/Classfitter/Classfitter/contents/{+path}",
        "compare_url": "https://api.github.com/repos/Classfitter/Classfitter/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/Classfitter/Classfitter/merges",
        "archive_url": "https://api.github.com/repos/Classfitter/Classfitter/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/Classfitter/Classfitter/downloads",
        "issues_url": "https://api.github.com/repos/Classfitter/Classfitter/issues{/number}",
        "pulls_url": "https://api.github.com/repos/Classfitter/Classfitter/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/Classfitter/Classfitter/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/Classfitter/Classfitter/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/Classfitter/Classfitter/labels{/name}",
        "releases_url": "https://api.github.com/repos/Classfitter/Classfitter/releases{/id}",
        "deployments_url": "https://api.github.com/repos/Classfitter/Classfitter/deployments",
        "created_at": "2016-07-07T20:10:20Z",
        "updated_at": "2016-08-18T02:20:32Z",
        "pushed_at": "2016-08-20T20:05:47Z",
        "git_url": "git://github.com/Classfitter/Classfitter.git",
        "ssh_url": "git@github.com:Classfitter/Classfitter.git",
        "clone_url": "https://github.com/Classfitter/Classfitter.git",
        "svn_url": "https://github.com/Classfitter/Classfitter",
        "homepage": null,
        "size": 182,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "Swift",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 4,
        "forks": 0,
        "open_issues": 4,
        "watchers": 0,
        "default_branch": "master"
    },
    "organization": {
        "login": "Classfitter",
        "id": 21082882,
        "url": "https://api.github.com/orgs/Classfitter",
        "repos_url": "https://api.github.com/orgs/Classfitter/repos",
        "events_url": "https://api.github.com/orgs/Classfitter/events",
        "hooks_url": "https://api.github.com/orgs/Classfitter/hooks",
        "issues_url": "https://api.github.com/orgs/Classfitter/issues",
        "members_url": "https://api.github.com/orgs/Classfitter/members{/member}",
        "public_members_url": "https://api.github.com/orgs/Classfitter/public_members{/member}",
        "avatar_url": "https://avatars.githubusercontent.com/u/21082882?v=3",
        "description": null
    },
    "sender": {
        "login": "jamesjwood",
        "id": 1565708,
        "avatar_url": "https://avatars.githubusercontent.com/u/1565708?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/jamesjwood",
        "html_url": "https://github.com/jamesjwood",
        "followers_url": "https://api.github.com/users/jamesjwood/followers",
        "following_url": "https://api.github.com/users/jamesjwood/following{/other_user}",
        "gists_url": "https://api.github.com/users/jamesjwood/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/jamesjwood/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/jamesjwood/subscriptions",
        "organizations_url": "https://api.github.com/users/jamesjwood/orgs",
        "repos_url": "https://api.github.com/users/jamesjwood/repos",
        "events_url": "https://api.github.com/users/jamesjwood/events{/privacy}",
        "received_events_url": "https://api.github.com/users/jamesjwood/received_events",
        "type": "User",
        "site_admin": false
    }
});

describe("SetGitHubDeploymentStatusWthPayload", function () {
    let kernel = new Kernel();
    kernel.bind<ISetGitHubDeploymentStatusWthPayload>(TYPES.iSetGitHubDeploymentStatusWthPayload).to(SetGitHubDeploymentStatusWthPayload);

    it("Should extract variabled from payload", function () {
        let called = false;
        let myFakeFunction: ISetGitHubDeploymentStatus = {
            "execute": function(user: string, repo: string, deploymentId: number, state: string, description: string){
                assert.equal(user, "Classfitter");
                called = true;
                let p = new Promise<string>(function (resolve, reject) {
                    process.nextTick(resolve);
                })
                return p;
            },
        };
        kernel.bind<ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus).toConstantValue(myFakeFunction);
        let setGitHubDeploymentStatusWthPayload = kernel.get<ISetGitHubDeploymentStatusWthPayload>(
            TYPES.iSetGitHubDeploymentStatusWthPayload);
        return setGitHubDeploymentStatusWthPayload.execute(payloadString, "pending", "description").then(function () {
            assert.equal(called, true);
        }).then(function () {
            kernel.unbind(TYPES.iSetGitHubDeploymentStatus);
        })
    });

})