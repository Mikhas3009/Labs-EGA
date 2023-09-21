"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadingZeros = exports.landScapeSearch = void 0;
const consts_1 = require("./consts");
const land_scape_1 = require("./land-scape");
function landScapeSearch() {
    for (let i = 0; i < Math.pow(2, consts_1.L); i++) {
        let num = i.toString(2);
        this.push(new land_scape_1.LandScape(leadingZeros(num.length) + num));
    }
}
exports.landScapeSearch = landScapeSearch;
function leadingZeros(length) {
    return (new Array(consts_1.L - length)).fill('0').join('');
}
exports.leadingZeros = leadingZeros;
