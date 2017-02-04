import assert = require("assert");
import mocha = require("mocha");
let fs = require("fs");

/// <reference path="node_modules/inversify-dts/inversify/inversify.d.ts" />


import ReadTestResultsFromFile from "../ReadTestResultsFromFile";
declare var done;
import {Kernel} from "inversify";
import * as interfaces from "../types";
import TYPES from "../types";


describe("ReadTestResultsFromFile", function () {
    let kernel = new Kernel();
    beforeEach(function(){
        kernel.bind<interfaces.IReadTestResultsFromFile>(
        TYPES.iReadTestResultsFromFile).to(ReadTestResultsFromFile);
    })
    afterEach(function(){
        kernel.unbindAll();
    });

    it("Should report error if there are any errors", function () {
        let readTestResultsFromFile = kernel.get<interfaces.IReadTestResultsFromFile>(TYPES.iReadTestResultsFromFile);
        return readTestResultsFromFile.execute("src/tests/TEST-ClassfitteriOSTests.xml").then(function(results){
            assert.equal(results.description, "2/4");
            assert.equal(results.result, "error");
        })
    });

     it("Should report succes otherwise", function () {
        let readTestResultsFromFile = kernel.get<interfaces.IReadTestResultsFromFile>(TYPES.iReadTestResultsFromFile);
        return readTestResultsFromFile.execute("src/tests/TEST-ClassfitteriOSUITests.xml").then(function(results){
            assert.equal(results.description, "1/1");
            assert.equal(results.result, "success");
        })
    });

     it("It should error if there is no file", function () {
        let ranThen = false;
        let threwError = false;
        let readTestResultsFromFile = kernel.get<interfaces.IReadTestResultsFromFile>(TYPES.iReadTestResultsFromFile);
        return readTestResultsFromFile.execute("src/tests/TEST-ClassfitteriOSUITestwerewr.xml").then(function(results){
               ranThen=true;
        }).catch(function(error){
            threwError = true;
        })
        .then(function(){
            assert.equal(ranThen, false);
            assert.equal(threwError, true);
        });
    });

    it("Should work with testsuites element", function () {
        let readTestResultsFromFile = kernel.get<interfaces.IReadTestResultsFromFile>(TYPES.iReadTestResultsFromFile);
        return readTestResultsFromFile.execute("src/tests/MSResults.xml").then(function(results){
            assert.equal(results.description, "8/8");
            assert.equal(results.result, "success");
        })
    });
})
