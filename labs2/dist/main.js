"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const land_scape_1 = require("./land-scape");
const land_scape_search_1 = require("./land-scape-search");
const neighborhood_definition_1 = require("./neighborhood-definition");
//задаем ландшафт поиска
const landScape = [];
land_scape_search_1.landScapeSearch.call(landScape);
// вывод ландшафта поиска 
for (let i = 0; i < 31; i++) {
    console.log("Кодировка: ", landScape[i].getCoding(), "  Приспособленность: ", landScape[i].getAdaptation());
}
//Входные данные
let i = 0;
let flag = false;
//Алгоритм
const si = land_scape_1.LandScape.getRandSi(landScape);
let maxS = si.getCoding();
let max = si.getAdaptation();
let neighbors = (0, neighborhood_definition_1.neighborsDef)(maxS);
for (let i = 0; i < consts_1.N; i++) {
    console.log("Шаг: ", i, "max: ", max, "maxS: ", maxS);
    if (flag) {
        neighbors = (0, neighborhood_definition_1.neighborsDef)(maxS);
    }
    if (neighbors.length <= 0) {
        break;
    }
    const { neighbor, index } = (0, neighborhood_definition_1.getRandNeihbor)(neighbors);
    let adaptation = ((_a = landScape.find(elem => elem.getCoding() == neighbor)) === null || _a === void 0 ? void 0 : _a.getAdaptation()) || 0;
    console.log("Выбираемая кодировка: ", neighbor, "Ее приспособленность: ", adaptation);
    if (adaptation > max) {
        max = adaptation;
        maxS = neighbor;
        console.log("Новый максммум: ", maxS, "Приспособленность: ", max);
        flag = true;
    }
    else {
        neighbors.splice(index, 1);
        flag = false;
    }
}
console.log(maxS, max);
