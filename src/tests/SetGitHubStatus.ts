import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts" />


import SetGitHubStatus from "../SetGitHubStatus";
declare var done;
import { Kernel, interfaces } from "inversify";



import {ISetGitHubStatus, IGitHubAPI} from "../types";
import TYPES from "../types";





describe("SetGitHubStatus", function () {
    let kernel = new Kernel();
    let OLD_VALUE = process.env.NODE_ENV;
    beforeEach(function(){
        process.env.NODE_ENV = "production";
        kernel.bind<ISetGitHubStatus>(
            TYPES.iSetGitHubStatus).to(SetGitHubStatus);
    });
    afterEach(function(){
        process.env.NODE_ENV = OLD_VALUE;
        kernel.unbindAll();
    });

    it("Should pass correct arguments", function () {
        let called: Boolean = false;

        let USER = "user";
        let REPO = "repo";
        let CONTEXT = "CONTEXT";
        let COMMIT = "COMMIT";
        let STATE = "pending";
        let DESCRIPTION = "description";
        let URL = "URL";


        let myFakeAPI = {
            "repos": {
                "createDeployment": function(requestArg){},
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
                    });
                    return p;
                },
                "createDeploymentStatus": function(){},
            },
        };
        kernel.bind<IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubStatus = kernel.get<ISetGitHubStatus>(TYPES.iSetGitHubStatus);
        return setGitHubStatus.execute(USER, REPO, COMMIT, CONTEXT, STATE, DESCRIPTION, URL).then(function () {
            assert.equal(called, true);
        }).then(function () {
            kernel.unbind(TYPES.iGitHubAPI);
        });
    });

     it("Should truncate description", function () {
        let called: Boolean = false;

        let USER = "user";
        let REPO = "repo";
        let CONTEXT = "CONTEXT";
        let COMMIT = "COMMIT";
        let STATE = "pending";
        let DESCRIPTION = "324kjjkhkjh4j3h4jkh4j32h4jlh34ljkh324jkh32l4kjh123l4kjh213l4kjh23l4kjh234lkj2h34l2kl3j4hj23h4kjh23g546o468549695486905486905846093u54oi6u5o4;ij6;o5ij654;oi6j;345i6j;4khjg234kjh3g5kj43hg5kjh43g";
        let URL = "URL";


        let PASSED_DESCRIPTION: string;

        let myFakeAPI = {
            "repos": {
                "createDeployment": function(requestArg){},
                "createStatus": function (requestArg) {
                    PASSED_DESCRIPTION = requestArg.description;
                    called = true;
                    let p = new Promise<string>(function (resolve, reject) {
                        process.nextTick(resolve);
                    });
                    return p;
                },
                "createDeploymentStatus": function(){},
            },
        };
        kernel.bind<IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubStatus = kernel.get<ISetGitHubStatus>(TYPES.iSetGitHubStatus);
        return setGitHubStatus.execute(USER, REPO, COMMIT, CONTEXT, STATE, DESCRIPTION, URL).then(function () {
            assert.equal(PASSED_DESCRIPTION, DESCRIPTION.slice(0, 140));
            assert.equal(called, true);
        }).then(function () {
            kernel.unbind(TYPES.iGitHubAPI);
        });


     });

    it("Should not call when environment is development", function () {
        let called: Boolean = false;
        let USER = "user";
        let REPO = "repo";
        let CONTEXT = "CONTEXT";
        let COMMIT = "COMMIT";
        let STATE = "pending";
        let DESCRIPTION = "324kjjkhkjh4";
        let URL = "URL";
        let myFakeAPI = {
            "repos": {
                "createDeployment": function(requestArg){},
                "createStatus": function (requestArg) {
                    called = true;
                    let p = new Promise<string>(function (resolve, reject) {
                        process.nextTick(resolve);
                    });
                    return p;
                },
                "createDeploymentStatus": function(){},
            },
        };
        process.env.NODE_ENV = "development";
        kernel.bind<IGitHubAPI>(TYPES.iGitHubAPI).toConstantValue(myFakeAPI);
        let setGitHubStatus = kernel.get<ISetGitHubStatus>(TYPES.iSetGitHubStatus);
        return setGitHubStatus.execute(USER, REPO, COMMIT, CONTEXT, STATE, DESCRIPTION, URL).then(function (returnedValue) {
            assert.equal(called, false);
            assert.equal(returnedValue.toString(), "Would have set " + CONTEXT + " status to pending");
        }).then(function () {
            kernel.unbind(TYPES.iGitHubAPI);
        });
    });
});
