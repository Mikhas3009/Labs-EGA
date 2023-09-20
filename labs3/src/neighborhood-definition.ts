import { K, L } from "./consts";
import { LandScape } from "./land-scape";
import { leadingZeros } from "./land-scape-search";

export function neighborsDef(coding:string,landScape:LandScape[]):LandScape[]{
    const neighbors:LandScape[] = [];
    for(let i = 0; i < Math.pow(2,L); i++){
        let num = i.toString(2);
        let neighbor = (leadingZeros(num.length)+num);
        const difference = (Number('0b'+neighbor)^Number('0b'+coding));
        const differenceStr = difference.toString(2);
        const regex1 = /[1]/g;
        if (differenceStr.match(regex1)?.length==K){
            neighbors.push(findCoding(neighbor,landScape));
        }
    }
    return neighbors
}

export function getRandNeihbor(neighbors:string[]){
    const index = Math.floor(Math.random()*neighbors.length);
    return {neighbor:neighbors[index],index:index};
}

function findCoding(coding: string,landScape:LandScape[]){
    let elem = landScape.find(elem=>
        elem.getCoding() == coding
    )||new LandScape(coding);
    return elem
}