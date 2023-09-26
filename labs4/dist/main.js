"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const land_scape_search_1 = require("./land-scape-search");
const methods_1 = require("./methods");
//задаем ландшафт поиска
const landScape = [];
land_scape_search_1.landScapeSearch.call(landScape);
// вывод ландшафта поиска 
for (let i = 0; i < consts_1.NUMBER_OF_PRINT_CODING; i++) {
    console.log("Кодировка: ", landScape[i].getCoding(), "  Приспособленность: ", landScape[i].getAdaptation());
}
//входные данные 
let max = 0;
let maxS = '';
for (let i = 0; i < consts_1.N; i++) {
    const k = Math.floor(Math.random() * 3);
    switch (k) {
        case 0: {
            console.log("\nЗапущен Монте-Карло....\n");
            const s = (0, methods_1.monteCarlo)(maxS, landScape, max);
            console.log("Метод отработал");
            if (s.getAdaptation() > max) {
                console.log("Новый Максимум: ", s.getAdaptation());
                max = s.getAdaptation();
                maxS = s.getCoding();
            }
            break;
        }
        case 1: {
            console.log("\nЗапущен метод поиска в глубину\n");
            const s = (0, methods_1.depthSearch)(maxS, landScape, max);
            console.log("Метод отработал");
            if (s.getAdaptation() > max) {
                console.log("Новый Максимум: ", s.getAdaptation());
                max = s.getAdaptation();
                maxS = s.getCoding();
            }
            break;
        }
        case 2: {
            console.log("\nЗапущен метод поиска в в ширину\n");
            const s = (0, methods_1.breadthSearch)(maxS, landScape, max);
            console.log("Метод отработал");
            if (s.getAdaptation() > max) {
                console.log("Новый Максимум: ", s.getAdaptation());
                max = s.getAdaptation();
                maxS = s.getCoding();
            }
            break;
        }
    }
}
console.log('Лучшая Кодировка: ', maxS, "Приспособленность: ", max);
