import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts" />


import CreateGitHubDeployment from "../CreateGitHubDeployment";
declare var done;
import { Kernel, interfaces } from "inversify";



import {ICreateGitHubDeployment, IGitHubAPI} from "../types";
import TYPES from "../types";

describe("CreateGitHubDeployment", function () {
    let kernel = new Kernel();
    let OLD_VALUE = process.env.NODE_ENV;
    beforeEach(function(){
        process.env.NODE_ENV = "production";
        kernel.bind<ICreateGitHubDeployment>(
            TYPES.iCreateGitHubDeployment).to(CreateGitHubDeployment);
    });
    afterEach(function(){
        process.env.NODE_ENV = OLD_VALUE;
        kernel.unbindAll();
    });

    it("Should pass correct arguments", function () {
        let called: Boolean = false;

        let USER = "user";
        let REPO = "repo";
        let REF = "REF";
        let ENVIRONMENT = "ENVIRONMENT";
        let VERSIONINCREMENT = "patch";
        let REQUIREDCONTEXTS = "test,production";

        let myFakeAPI = {
            "repos": {
                "createStatus": function(requestArg){},
                "createDeployment": function (requestArg) {
                    assert.equal(requestArg.owner, USER);
                    assert.equal(requestArg.repo, REPO);
                    assert.equal(requestArg.ref, REF);
                    assert.equal(requestArg.task, "deploy:" + ENVIRONMENT);
                    assert.equal(requestArg.environment, ENVIRONMENT);
                    assert.equal(requestArg.payload, JSON.stringify({"versionIncrement": VERSIONINCREMENT}));
                    assert.equal(requestArg.required_contexts[0], "test");
                    assert.equal(requestArg.required_contexts[1], "production");
                    assert.equal(requestArg.required_contexts.length, 2);

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
        let createGitHubDeployment = kernel.get<ICreateGitHubDeployment>(TYPES.iCreateGitHubDeployment);
        return createGitHubDeployment.execute(USER, REPO, REF, ENVIRONMENT, VERSIONINCREMENT, REQUIREDCONTEXTS).then(function () {
            assert.equal(called, true);
        }).then(function () {
            kernel.unbind(TYPES.iGitHubAPI);
        });
    });

});
