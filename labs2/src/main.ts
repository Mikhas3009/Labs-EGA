import { N } from "./consts";
import { LandScape } from "./land-scape";
import { landScapeSearch } from "./land-scape-search";
import { getRandNeihbor, neighborsDef } from "./neighborhood-definition";

//задаем ландшафт поиска
const landScape: LandScape[]=[];
landScapeSearch.call(landScape);

// вывод ландшафта поиска 
for(let i = 0; i < 31;i++){
    console.log("Кодировка: ",landScape[i].getCoding(), "  Приспособленность: ",landScape[i].getAdaptation())
}
//Входные данные
let flag:boolean = false;

//Алгоритм
const si = LandScape.getRandSi(landScape);
let maxS = si.getCoding();
let max = si.getAdaptation();
let neighbors = neighborsDef(maxS);
for (let i =0; i< N;i++){
    console.log("Шаг: ",i, "max: ",max, "maxS: ",maxS);
    if(flag){
        neighbors = neighborsDef(maxS);
    }
    if (neighbors.length <=0){
        break;
    }
    const {neighbor,index} = getRandNeihbor(neighbors);
  
    let adaptation = landScape.find(elem=>
        elem.getCoding() == neighbor
    )?.getAdaptation()||0;
    console.log("Выбираемая кодировка: ",neighbor,"Ее приспособленность: ",adaptation);
    if(adaptation>max){
        max = adaptation;
        maxS = neighbor;
        console.log("Новый максммум: ",maxS , "Приспособленность: ",max)
        flag = true
    }
    else{
        neighbors.splice(index,1);
        flag = false;
    }
}
console.log(maxS,max)