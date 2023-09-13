import { L } from "./consts"

export function landScapeSearch (this:string[]){
    for(let i = 0; i < this.length; i++){
        let num = Math.floor(Math.random()*Math.pow(2,L)).toString(2);
        this[i] = leadingZeros(num.length)+num;
    }
}

function leadingZeros(length:number):string{
    return (new Array(L-length)).fill('0').join('')
}