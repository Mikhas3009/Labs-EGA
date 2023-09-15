"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandScape = void 0;
const consts_1 = require("./consts");
class LandScape {
    constructor(coding) {
        this.coding = coding;
        this.adaptation = this.calcAdaptation(coding);
    }
    calcAdaptation(coding) {
        return Math.floor(Math.random() * consts_1.maxAdaptation);
    }
    getCoding() {
        return this.coding;
    }
    getAdaptation() {
        return this.adaptation;
    }
    static getRandSi(landScape) {
        return landScape[Math.floor(Math.random() * landScape.length)];
    }
}
exports.LandScape = LandScape;
