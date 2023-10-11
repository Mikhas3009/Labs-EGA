"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const land_scape_1 = require("./land-scape");
const land_scape_search_1 = require("./land-scape-search");
const neighborhood_definition_1 = require("./neighborhood-definition");
//задаем ландшафт поиска
const landScape = [];
land_scape_search_1.landScapeSearch.call(landScape);
// вывод ландшафта поиска 
for (let i = 0; i < consts_1.NUMBER_OF_PRINT_CODING; i++) {
    console.log("Кодировка: ", landScape[i].getCoding(), "  Приспособленность: ", landScape[i].getAdaptation());
}
//Входные данные
let flag = false;
//Алгоритм
const si = land_scape_1.LandScape.getRandSi(landScape);
let maxS = si.getCoding();
let max = si.getAdaptation();
let neighbors = (0, neighborhood_definition_1.neighborsDef)(maxS, landScape);
for (let i = 0; i < consts_1.N; i++) {
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
console.log('Лучшая Кодировка: ', maxS, "Приспособленность: ", max);
