import { N, NUMBER_OF_PRINT_CODING } from "./consts";
import { LandScape } from "./land-scape";
import { landScapeSearch } from "./land-scape-search";
import { getRandNeihbor, neighborsDef } from "./neighborhood-definition";

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
let neighbors = neighborsDef(maxS,landScape);
for (let i =0; i< N;i++){
    console.log("Шаг: ",i, "max: ",max, "maxS: ",maxS);
    if(flag){
        neighbors = neighborsDef(maxS,landScape);
    }
    if (neighbors.length <=0){
        break;
    }
    const {neighbor,index} = getRandNeihbor(neighbors);
    console.log("Окресность: ",neighbors);
    console.log("Выбираемая кодировка: ",neighbor.getCoding(),"Ее приспособленность: ",neighbor.getAdaptation());
    // console.log("Окресность: ")
    // LandScape.printLandScape(neighbors)
    if(neighbor.getAdaptation()>max){
        max = neighbor.getAdaptation();
        maxS = neighbor.getCoding();
        console.log("Новый максммум: ",maxS , "Приспособленность: ",max)
        flag = true
    }
    else{
        neighbors.splice(index,1);
        flag = false;
    }
}
console.log('Лучшая Кодировка: ',maxS,"Приспособленность: ",max)