import { findClosest } from "./closest-sity";

export function findCadidates(S:number[],matrix:number[][],X:number[]){
    const candidates: number[] = [];
    S.forEach((elem,index)=>{
       candidates.push(X[findClosest(elem,matrix,X)]);
    });
    return candidates;
}