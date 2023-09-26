"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monteCarlo = void 0;
const consts_1 = require("./consts");
const land_scape_1 = require("./land-scape");
function monteCarlo(maxS, landScape, max) {
    for (let i = 0; i < consts_1.n; i++) {
        const currentIndex = Math.floor(Math.random() * landScape.length);
        const si = landScape[currentIndex];
        console.log("Шаг: ", i, "max: ", max, "maxS: ", maxS);
        console.log("Выбираемая кодировка: ", si.getCoding(), "Ее приспособленность: ", si.getAdaptation());
        if (max < si.getAdaptation()) {
            max = si.getAdaptation();
            maxS = si.getCoding();
            console.log("Новый максммум: ", maxS, "Приспособленность: ", max);
        }
    }
    return new land_scape_1.LandScape(maxS, max);
}
exports.monteCarlo = monteCarlo;
