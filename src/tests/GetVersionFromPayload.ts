import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

import GetVersionFromPayload from "../GetVersionFromPayload";
declare var done;
import {Kernel} from "inversify";

import * as interfaces from "../types";
import TYPES from "../types";

describe("SetGitHubDeploymentStatus", function () {
    let kernel = new Kernel();
    beforeEach(function(){
        kernel.bind<interfaces.IGetVersionFromPayload>(
            TYPES.iGetVersionFromPayload).to(GetVersionFromPayload);
    })
    afterEach(function(){
        kernel.unbindAll();
    });

    it("Should pass correct arguments", function () {
        let getVersionFromPayload = kernel.get<interfaces.IGetVersionFromPayload>(TYPES.iGetVersionFromPayload);
        return getVersionFromPayload.execute("./src/tests/deploymentPayload.json").then(function (version) {
            assert.equal(version, "0.0.1");
        })
    });
})
