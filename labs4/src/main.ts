import { N, NUMBER_OF_PRINT_CODING } from "./consts";
import { LandScape } from "./land-scape";
import { landScapeSearch } from "./land-scape-search";
import { breadthSearch, depthSearch, monteCarlo } from "./methods";

//задаем ландшафт поиска
const landScape: LandScape[] = [];
landScapeSearch.call(landScape);

// вывод ландшафта поиска 
for(let i = 0; i < NUMBER_OF_PRINT_CODING;i++){
    console.log("Кодировка: ",landScape[i].getCoding(), "  Приспособленность: ",landScape[i].getAdaptation())
}

//входные данные 
let max:number = 0;
let maxS:string = '';
for(let i = 0; i < N;i++){
    const k = Math.floor(Math.random() * 3);
    switch (k){
        case 0:{
            console.log("\nЗапущен Монте-Карло....\n");
            const s = monteCarlo(maxS,landScape,max);
            console.log("Метод отработал");
            if(s.getAdaptation()>max){
                console.log("Новый Максимум: ",s.getAdaptation());
                max = s.getAdaptation();
                maxS = s.getCoding();
            }
            break;
        }
        case 1:{
            console.log("\nЗапущен метод поиска в глубину\n")
            const s = depthSearch(maxS,landScape,max);
            console.log("Метод отработал");
            if(s.getAdaptation()>max){
                console.log("Новый Максимум: ",s.getAdaptation());
                max = s.getAdaptation();
                maxS = s.getCoding();
            }
            break;
        }
        case 2:{
            console.log("\nЗапущен метод поиска в в ширину\n")
            const s = breadthSearch(maxS,landScape,max);
            console.log("Метод отработал");
            if(s.getAdaptation()>max){
                console.log("Новый Максимум: ",s.getAdaptation());
                max = s.getAdaptation();
                maxS = s.getCoding();
            }
            break; 
        }
    }
}
console.log('Лучшая Кодировка: ',maxS,"Приспособленность: ",max)