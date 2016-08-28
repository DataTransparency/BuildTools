import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");
/// <reference path="../../typings/globals/inversify/index.d.ts" />

import SetGitHubStatusFromTestResutsFile from "../SetGitHubStatusFromTestResutsFile";
import { Kernel} from "inversify";


import TYPES from "../types";
import * as interfaces from "../types";


describe("SetGitHubStatusFromTestResutsFile", function () {
    let kernel = new Kernel();

    beforeEach(function(){
       kernel.bind<interfaces.ISetGitHubStatusFromTestResutsFile>(
        TYPES.iSetGitHubStatusFromTestResutsFile).to(SetGitHubStatusFromTestResutsFile);
    })
    afterEach(function(){
        kernel.unbindAll();
    });


    it("Should call read ReadResultsFromFile and SetGitHubStatus", function () {
        let user ="user"; 
        let repo ="repo";
        let revision ="revision";
        let fileName ="fileName";
        let context ="context";
        let url ="url";
        let description ="description";
        let result ="result";


        let calledFakeResultsFromFile = false;
        let fakeResultsFromFile: interfaces.IReadTestResultsFromFile = {
            "execute": function(sfileName: string){
                assert.equal(sfileName, fileName);
                calledFakeResultsFromFile = true;
                let p = new Promise<interfaces.ITestResult>(function (resolve, reject) {
                    process.nextTick(function(){resolve({description: description, result: result})});
                })
                return p;
            },
        };
        

        let calledFakeSetGitHubStatus = false;
        let fakeSetGitHubStatus: interfaces.ISetGitHubStatus = {
            "execute": function(suser: string, srepo: string, scommit: string, scontext: string, sstate: string, sdescription: string, surl: string){
                assert.equal(suser, user);
                assert.equal(srepo, repo);
                assert.equal(scommit, revision);
                assert.equal(scontext, context);
                assert.equal(sstate, result);
                assert.equal(surl, url);
                assert.equal(sdescription, description);
                calledFakeSetGitHubStatus = true;
                let p = new Promise<interfaces.ITestResult>(function (resolve, reject) {
                    process.nextTick(resolve);
                })
                return p;
            },
        };

        kernel.bind<interfaces.IReadTestResultsFromFile>(TYPES.iReadTestResultsFromFile).toConstantValue(fakeResultsFromFile);
        kernel.bind<interfaces.ISetGitHubStatus>(TYPES.iSetGitHubStatus).toConstantValue(fakeSetGitHubStatus);

        let setGitHubStatusFromTestResutsFile = kernel.get<interfaces.ISetGitHubStatusFromTestResutsFile>(
            TYPES.iSetGitHubStatusFromTestResutsFile);


        return setGitHubStatusFromTestResutsFile.execute(user, repo, revision, fileName, context, url).then(function () {
            assert.equal(calledFakeResultsFromFile, true);
            assert.equal(calledFakeSetGitHubStatus, true);
        });
    });

})