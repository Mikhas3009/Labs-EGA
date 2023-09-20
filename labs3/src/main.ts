import { N, NUMBER_OF_PRINT_CODING } from "./consts";
import { LandScape } from "./land-scape";
import { landScapeSearch } from "./land-scape-search";
import {  neighborsDef } from "./neighborhood-definition";

//задаем ландшафт поиска
const landScape: LandScape[]=[];
landScapeSearch.call(landScape);

// вывод ландшафта поиска 
for(let i = 0; i < NUMBER_OF_PRINT_CODING;i++){
    console.log("Кодировка: ",landScape[i].getCoding(), "  Приспособленность: ",landScape[i].getAdaptation())
}
//Входные данные
let flag:boolean = false;

//Алгоритм
const si = LandScape.getRandSi(landScape);
let maxS = si.getCoding();
let max = si.getAdaptation();
for (let i =0; i< N;i++){
    let neighbors = neighborsDef(maxS,landScape);
    console.log('Выбираемая кодировка: ',maxS," Приспособленность: ",max)
    console.log("Окресность: ",neighbors);
    //console.log("Окресность: ",LandScape.printLandScape(landScape))
    const element = LandScape.maxAdaptation(neighbors);
    if(element.getAdaptation()>max){
        max = element.getAdaptation();
        maxS = element.getCoding();
        console.log("Новый максммум: ",maxS , "Приспособленность: ",max)
    }
    else{
        break;
    }
}
console.log('Лучшая Кодировка: ',maxS,"Приспособленность: ",max)