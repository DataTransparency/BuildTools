import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts" />


import SetGitHubDeploymentStatus from "../SetGitHubDeploymentStatus";
declare var done;
import { Kernel, interfaces } from "inversify";

var kernel = new Kernel();

import {ISetGitHubDeploymentStatus, IGitHubAPI} from "../types";
import TYPES from "../types";

kernel.bind<ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus).to(SetGitHubDeploymentStatus);

let USER = "user";
let REPO = "repo";
let ID = 4534543;
let STATE = "pending";
let DESCRIPTION = "description";

describe("SetGitHubDeploymentStatus", function () {
    it("Should pass correct arguments", function () {
        let called: Boolean = false;
        let myFakeAPI = {
            "repos": {
                "createStatus": function(requestArg){},
                "createDeploymentStatus": function (requestArg) {
                    assert.equal(requestArg.user, USER);
                    assert.equal(requestArg.repo, REPO);
                    assert.equal(requestArg.id, ID);
                    assert.equal(requestArg.state, STATE);
                    assert.equal(requestArg.description, DESCRIPTION);
                    called = true;
                    let p = new Promise<string>(function (resolve, reject) {
                        process.nextTick(resolve);
                    })
                    return p;
                }
            }
        }
        kernel.bind<IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubDeploymentStatus = kernel.get<ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus);
        return setGitHubDeploymentStatus.execute(USER, REPO, ID, STATE, DESCRIPTION).then(function () {
            assert.equal(called, true);
        }).then(function () {
            kernel.unbind(TYPES.iGitHubAPI);
        })
    });

    it("Should reject invalid statuses", function (done) {
        let myFakeAPI = {
            "repos": {
                "createStatus": function(requestArg){},
                "createDeploymentStatus": function (requestArg) {}
            },
        };

        kernel.bind<IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubDeploymentStatus = kernel.get<ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus);
        assert.throws(function () {
            setGitHubDeploymentStatus.execute(USER, REPO, ID, "rubish", DESCRIPTION);
        });
        kernel.unbind(TYPES.iGitHubAPI);
        done();
    });
})
