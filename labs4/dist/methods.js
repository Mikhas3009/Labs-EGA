"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadthSearch = exports.depthSearch = exports.monteCarlo = void 0;
const consts_1 = require("./consts");
const land_scape_1 = require("./land-scape");
const neighborhood_definition_1 = require("./neighborhood-definition");
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
function depthSearch(maxS, landScape, max) {
    let neighbors = (0, neighborhood_definition_1.neighborsDef)(maxS, landScape);
    let flag = false;
    for (let i = 0; i < consts_1.n; i++) {
        console.log("Шаг: ", i, "max: ", max, "maxS: ", maxS);
        if (flag) {
            neighbors = (0, neighborhood_definition_1.neighborsDef)(maxS, landScape);
        }
        if (neighbors.length <= 0) {
            break;
        }
        const { neighbor, index } = (0, neighborhood_definition_1.getRandNeihbor)(neighbors);
        console.log("Окресность: ", neighbors);
        console.log("Выбираемая кодировка: ", neighbor.getCoding(), "Ее приспособленность: ", neighbor.getAdaptation());
        // console.log("Окресность: ")
        // LandScape.printLandScape(neighbors)
        if (neighbor.getAdaptation() > max) {
            max = neighbor.getAdaptation();
            maxS = neighbor.getCoding();
            console.log("Новый максммум: ", maxS, "Приспособленность: ", max);
            flag = true;
        }
        else {
            neighbors.splice(index, 1);
            flag = false;
        }
    }
    return new land_scape_1.LandScape(maxS, max);
}
exports.depthSearch = depthSearch;
function breadthSearch(maxS, landScape, max) {
    for (let i = 0; i < consts_1.n; i++) {
        console.log("Шаг: ", i, "max: ", max, "maxS: ", maxS);
        let neighbors = (0, neighborhood_definition_1.neighborsDef)(maxS, landScape);
        console.log('Текущий Максимум: ', maxS, " Приспособленность: ", max);
        console.log("Окресность: ", neighbors);
        const element = land_scape_1.LandScape.maxAdaptation(neighbors);
        console.log('Выбираемая из окресности кодировка: ', element.getCoding(), " Приспособленность: ", element.getAdaptation());
        if (element.getAdaptation() > max) {
            max = element.getAdaptation();
            maxS = element.getCoding();
            console.log("Новый максммум: ", maxS, "Приспособленность: ", max);
        }
        else {
            break;
        }
    }
    return new land_scape_1.LandScape(maxS, max);
}
exports.breadthSearch = breadthSearch;
