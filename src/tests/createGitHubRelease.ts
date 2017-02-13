import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts" />


import CreateGitHubRelease from "../createGitHubRelease";
declare var done;
import {Kernel} from "inversify";
import * as interfaces from "../types";
import TYPES from "../types";


describe("CreateGitHubRelease", function () {
    let kernel = new Kernel();
    beforeEach(function(){
        kernel.bind<interfaces.ICreateGitHubRelease>(
        TYPES.iCreateGitHubRelease).to(CreateGitHubRelease);
    })
    afterEach(function(){
        kernel.unbindAll();
    });

    it("Should readfile and pass to publish release, function () {
        let readTestResultsFromFile = kernel.get<interfaces.IReadTestResultsFromFile>(TYPES.iReadTestResultsFromFile);
        return readTestResultsFromFile.execute("src/tests/TEST-ClassfitteriOSTests.xml").then(function(results){
            assert.equal(results.description, "2/4");
            assert.equal(results.result, "error");
        })
    });

     
})
