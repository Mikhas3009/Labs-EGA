import { findDistance } from "./find-distance";

export function print(S:number[],Z:number[],matrix:number[][]){
    S.forEach((element,index) => {
        console.log("Город:" ,element,"Кандидат:" , Z[index],"Расстояние: ",findDistance(element,Z[index],matrix))
    });
}