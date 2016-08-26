import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");
/// <reference path="../../typings/globals/inversify/index.d.ts" />

import SetGitHubDeploymentStatusWithPayload from "../SetGitHubDeploymentStatusWithPayload";
import { Kernel, interfaces } from "inversify";


import TYPES from "../types";
import {ISetGitHubDeploymentStatus, ISetGitHubDeploymentStatusWithPayload} from "../types";


describe("SetGitHubDeploymentStatusWithPayload", function () {
    let kernel = new Kernel();

    beforeEach(function(){
       kernel.bind<ISetGitHubDeploymentStatusWithPayload>(
        TYPES.iSetGitHubDeploymentStatusWithPayload).to(SetGitHubDeploymentStatusWithPayload);
    })
    afterEach(function(){
        kernel.unbindAll();
    });


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
        let setGitHubDeploymentStatusWithPayload = kernel.get<ISetGitHubDeploymentStatusWithPayload>(
            TYPES.iSetGitHubDeploymentStatusWithPayload);
        return setGitHubDeploymentStatusWithPayload.execute("src/tests/deploymentPayload.json", "pending", "description").then(function () {
            assert.equal(called, true);
        })
    });

})