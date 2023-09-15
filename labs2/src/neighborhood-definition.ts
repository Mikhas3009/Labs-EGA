import { K, L } from "./consts";
import { leadingZeros } from "./land-scape-search";

export function neighborsDef(coding:string):string[]{
    const neighbors:string[] = [];
    for(let i = 0; i < Math.pow(2,L)-1; i++){
        let num = i.toString(2);
        let neighbor = (leadingZeros(num.length)+num);
        const difference = (Number('0b'+neighbor)^Number('0b'+coding));
        const differenceStr = difference.toString(2);
        const regex1 = /[1]/g;
        if (differenceStr.match(regex1)?.length==K){
            neighbors.push(neighbor);
        }
    }
    return neighbors
}

export function getRandNeihbor(neighbors:string[]){
    const index = Math.floor(Math.random()*neighbors.length);
    return {neighbor:neighbors[index],index:index};
}