"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandScape = void 0;
const consts_1 = require("./consts");
class LandScape {
    constructor(coding, adaptation) {
        this.coding = coding;
        this.adaptation = adaptation || this.calcAdaptation(coding);
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
    static printLandScape(landScape) {
        landScape.forEach((elem) => {
            console.log("Кодировка: ", elem.getCoding(), " Приспособленность: ", elem.getAdaptation());
        });
    }
    static maxAdaptation(landScape) {
        let max = landScape[0].getAdaptation();
        let coding = '';
        landScape.forEach(elem => {
            if (max < elem.getAdaptation()) {
                max = elem.getAdaptation();
                coding = elem.getCoding();
            }
        });
        return new LandScape(coding, max);
    }
}
exports.LandScape = LandScape;
