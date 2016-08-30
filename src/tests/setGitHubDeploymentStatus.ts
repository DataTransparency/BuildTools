import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts" />


import SetGitHubDeploymentStatus from "../SetGitHubDeploymentStatus";
declare var done;
import {Kernel} from "inversify";



import * as interfaces from "../types";
import TYPES from "../types";



let USER = "user";
let REPO = "repo";
let ID = 4534543;
let STATE = "pending";
let DESCRIPTION = "description";

describe("SetGitHubDeploymentStatus", function () {
    let kernel = new Kernel();
    let OLD_VALUE = process.env.NODE_ENV;
    beforeEach(function(){
        process.env.NODE_ENV = "production";
        kernel.bind<interfaces.ISetGitHubDeploymentStatus>(
        TYPES.iSetGitHubDeploymentStatus).to(SetGitHubDeploymentStatus);
    })
    afterEach(function(){
        process.env.NODE_ENV = OLD_VALUE;
        kernel.unbindAll();
    });

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
        kernel.bind<interfaces.IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubDeploymentStatus = kernel.get<interfaces.ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus);
        return setGitHubDeploymentStatus.execute(USER, REPO, ID, STATE, DESCRIPTION).then(function () {
            assert.equal(called, true);
        })
    });

    it("Should reject invalid statuses", function (done) {
        let myFakeAPI = {
            "repos": {
                "createStatus": function(requestArg){},
                "createDeploymentStatus": function (requestArg) {}
            },
        };

        kernel.bind<interfaces.IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubDeploymentStatus = kernel.get<interfaces.ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus);
        assert.throws(function () {
            setGitHubDeploymentStatus.execute(USER, REPO, ID, "rubish", DESCRIPTION);
        });
        done();
    });

     it("Should not call when environment is development", function () {
        let called: Boolean = false;
        let myFakeAPI = {
            "repos": {
                "createStatus": function(requestArg){},
                "createDeploymentStatus": function (requestArg) {
                    called = true;
                    let p = new Promise<string>(function (resolve, reject) {
                        process.nextTick(resolve);
                    })
                    return p;
                }
            }
        }
        process.env.NODE_ENV = "development";
        kernel.bind<interfaces.IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubDeploymentStatus = kernel.get<interfaces.ISetGitHubDeploymentStatus>(TYPES.iSetGitHubDeploymentStatus);
        return setGitHubDeploymentStatus.execute(USER, REPO, ID, STATE, DESCRIPTION).then(function (returnedValue) {
            assert.equal(called, false);
            assert.equal(returnedValue.toString(), "Would have set deployment status to pending");
        })
    });
})
