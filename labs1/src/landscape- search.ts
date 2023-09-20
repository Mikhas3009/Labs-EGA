import { L} from "./consts"

export function landScapeSearch (this:string[]){
    for(let i = 0; i < Math.pow(2,L)-1; i++){
        let num = i.toString(2);
        this.push(leadingZeros(num.length)+num);
    }
}

function leadingZeros(length:number):string{
    return (new Array(L-length)).fill('0').join('')
}