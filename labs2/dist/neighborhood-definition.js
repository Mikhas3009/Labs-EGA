"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandNeihbor = exports.neighborsDef = void 0;
const consts_1 = require("./consts");
const land_scape_search_1 = require("./land-scape-search");
function neighborsDef(coding) {
    var _a;
    const neighbors = [];
    for (let i = 0; i < Math.pow(2, consts_1.L) - 1; i++) {
        let num = i.toString(2);
        let neighbor = ((0, land_scape_search_1.leadingZeros)(num.length) + num);
        const difference = (Number('0b' + neighbor) ^ Number('0b' + coding));
        const differenceStr = difference.toString(2);
        const regex1 = /[1]/g;
        if (((_a = differenceStr.match(regex1)) === null || _a === void 0 ? void 0 : _a.length) == consts_1.K) {
            neighbors.push(neighbor);
        }
    }
    return neighbors;
}
exports.neighborsDef = neighborsDef;
function getRandNeihbor(neighbors) {
    const index = Math.floor(Math.random() * neighbors.length);
    return { neighbor: neighbors[index], index: index };
}
exports.getRandNeihbor = getRandNeihbor;
