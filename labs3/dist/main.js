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
for (let i = 0; i < consts_1.N; i++) {
    let neighbors = (0, neighborhood_definition_1.neighborsDef)(maxS, landScape);
    console.log('Выбираемая кодировка: ', maxS, " Приспособленность: ", max);
    console.log("Окресность: ", neighbors);
    //console.log("Окресность: ",LandScape.printLandScape(landScape))
    const element = land_scape_1.LandScape.maxAdaptation(neighbors);
    if (element.getAdaptation() > max) {
        max = element.getAdaptation();
        maxS = element.getCoding();
        console.log("Новый максммум: ", maxS, "Приспособленность: ", max);
    }
    else {
        break;
    }
}
console.log('Лучшая Кодировка: ', maxS, "Приспособленность: ", max);
