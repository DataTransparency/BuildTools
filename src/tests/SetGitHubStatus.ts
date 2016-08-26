import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts" />


import SetGitHubStatus from "../SetGitHubStatus";
declare var done;
import { Kernel, interfaces } from "inversify";



import {ISetGitHubStatus, IGitHubAPI} from "../types";
import TYPES from "../types";



let USER = "user";
let REPO = "repo";
let CONTEXT = "CONTEXT";
let COMMIT = "COMMIT";
let STATE = "pending";
let DESCRIPTION = "description";
let URL= "URL";

describe("SetGitHubStatus", function () {
    let kernel = new Kernel();

    beforeEach(function(){
        kernel.bind<ISetGitHubStatus>(
            TYPES.iSetGitHubStatus).to(SetGitHubStatus);
    })
    afterEach(function(){
        kernel.unbindAll();
    });

    it("Should pass correct arguments", function () {
        let called: Boolean = false;
        let myFakeAPI = {
            "repos": {
                "createStatus": function (requestArg) {
                    assert.equal(requestArg.user, USER);
                    assert.equal(requestArg.repo, REPO);
                    assert.equal(requestArg.context, CONTEXT);
                    assert.equal(requestArg.sha, COMMIT);
                    assert.equal(requestArg.state, STATE);
                    assert.equal(requestArg.description, DESCRIPTION);
                    assert.equal(requestArg.target_url, URL);
                    called = true;
                    let p = new Promise<string>(function (resolve, reject) {
                        process.nextTick(resolve);
                    })
                    return p;
                },
                "createDeploymentStatus": function(){},
            }
        }
        kernel.bind<IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubStatus = kernel.get<ISetGitHubStatus>(TYPES.iSetGitHubStatus);
        return setGitHubStatus.execute(USER, REPO, COMMIT, CONTEXT, STATE, DESCRIPTION, URL).then(function () {
            assert.equal(called, true);
        }).then(function () {
            kernel.unbind(TYPES.iGitHubAPI);
        })
    });
})
