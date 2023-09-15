import { L } from "./consts"
import { LandScape } from "./land-scape";

export function landScapeSearch (this:LandScape[]){
    for(let i = 0; i < Math.pow(2,L)-1; i++){
        let num = i.toString(2);
        this.push(new LandScape(leadingZeros(num.length)+num));
    }
}

export function leadingZeros(length:number):string{
    return (new Array(L-length)).fill('0').join('')
}