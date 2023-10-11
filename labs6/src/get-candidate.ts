import { countDistances } from "./distance-matrix"
import { findDistance } from "./find-distance"

export type Para = {
    syty:number;
    candidat:number;
    position:number;
}

export function getCandidate(S:number[],Z:number[],matrix:number[][]){
    let minDistance = findDistance(S[0],Z[0],matrix);
    let para:Para={
        syty: S[0],
        candidat: Z[0],
        position: 1
    };
    S.forEach((elem,index)=>{
        if(minDistance>findDistance(elem,Z[index],matrix)){
            minDistance = findDistance(elem,Z[index],matrix);
            para.syty = elem;
            para.candidat = Z[index];
            para.position = index+1;
        }
    })
    return para;
}