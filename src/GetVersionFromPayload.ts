import * as interfaces from "./types";
import TYPES from "./types";
import {injectable, inject} from "inversify";

import {required, validate, defined} from "./validation";

import xpath = require("xpath");
import xmlDom = require("xmldom");
let parser = xmlDom.DOMParser;
let fs = require("fs");
import  * as semver from "semver";



function readFileAsync(filename: String): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "ascii", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

@injectable()
class GetVersionFromPayload implements interfaces.IGetVersionFromPayload {
    @defined
    public execute(path: String): Promise<string> {
        return readFileAsync(path).then(function (fileData) {
            let payload = JSON.parse(fileData.toString());
            let innerPayload = JSON.parse(payload.deployment.payload);
            let version = innerPayload.version;
            semver.valid(version);
            if(version == null) {
                throw Error("No version found in deployment payload");
            }
            else {
                return semver.major(version) + "." + semver.minor(version) + "." + semver.patch(version);
            }
        })
    }
}

export default GetVersionFromPayload;
