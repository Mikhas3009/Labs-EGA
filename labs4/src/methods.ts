import { n } from "./consts";
import { LandScape } from "./land-scape";
import { getRandNeihbor, neighborsDef } from "./neighborhood-definition";


export function monteCarlo(maxS:string,landScape:LandScape[],max:number){
    for (let i = 0; i < n; i++) {
        const currentIndex:number = Math.floor(Math.random()*landScape.length);
        const si = landScape[currentIndex];
        console.log("Шаг: ",i, "max: ",max, "maxS: ",maxS);
        console.log("Выбираемая кодировка: ",si.getCoding(), "Ее приспособленность: ",si.getAdaptation())
        if(max<si.getAdaptation()){
            max = si.getAdaptation();
            maxS = si.getCoding();
            console.log("Новый максммум: ",maxS , "Приспособленность: ",max)
        }
    }
    return new LandScape(maxS,max)
}

export function depthSearch(maxS:string,landScape:LandScape[],max:number){
    let neighbors = neighborsDef(maxS,landScape);
    let flag:boolean = false;
    for (let i =0; i< n;i++){
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
    return new LandScape(maxS,max)
}

export function breadthSearch(maxS:string,landScape:LandScape[],max:number){
    for (let i =0; i< n;i++){
        console.log("Шаг: ",i, "max: ",max, "maxS: ",maxS);
        let neighbors = neighborsDef(maxS,landScape);
        console.log('Текущий Максимум: ',maxS," Приспособленность: ",max)
        console.log("Окресность: ",neighbors);
        const element = LandScape.maxAdaptation(neighbors);
        console.log('Выбираемая из окресности кодировка: ',element.getCoding()," Приспособленность: ",element.getAdaptation())
        if(element.getAdaptation()>max){
            max = element.getAdaptation();
            maxS = element.getCoding();
            console.log("Новый максммум: ",maxS , "Приспособленность: ",max)
        }
        else{
            break;
        }
    }  
    return new LandScape(maxS,max)
}