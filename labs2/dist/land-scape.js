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
        let num = Number("0b" + coding);
        return Math.pow((num - Math.pow(2, (consts_1.L - 1))), 2);
        //  return Math.floor(Math.random()*maxAdaptation);
    }
    getCoding() {
        return this.coding;
    }
    getAdaptation() {
        return this.adaptation;
    }
    static printLandScape(landScape) {
        landScape.forEach((elem) => {
            console.log("Кодировка: ", elem.getCoding(), " Приспособленность: ", elem.getAdaptation());
        });
    }
    static getRandSi(landScape) {
        return landScape[Math.floor(Math.random() * landScape.length)];
    }
}
exports.LandScape = LandScape;
