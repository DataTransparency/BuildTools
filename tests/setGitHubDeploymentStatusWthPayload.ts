/// <reference path="../typings/globals/node/index.d.ts"/>
/// <reference path="../typings/globals/assert/index.d.ts"/>
/// <reference path="../typings/globals/mocha/index.d.ts"/>

import assert = require("assert")
import mocha = require("mocha")
import fs = require("fs")
import setGitHubDeploymentStatusWthPayload from "../src/setGitHubDeploymentStatusWthPayload"

describe('setGitHubDeploymentStatusWthPayload', function() {
    it('request setGitHubDeploymentStatus', function() {
      return setGitHubDeploymentStatusWthPayload(fs.readFileSync('deploymentPayload.json').toString()
      ,'pending', 'description')
      .then(function(){
          done();
      }).done()
    });
});