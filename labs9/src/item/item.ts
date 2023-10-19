import { MAX_ITEM_UTILITY, MAX_ITEM_WEIGTH } from "../consts";
import { ItemInterface } from "./item-interface";


type diapazon = {low: number, high: number}
// @ts-ignore
export class Item implements ItemInterface{
    private number:number;
    private weigth:number;
    private utility:number;
    private itemChance?:diapazon;
    private isPlased:'1'|'0';
    private maxDiapazon?:number;

    constructor(number:number,weigth:number, utility:number){
        this.weigth = weigth;
        this.utility =utility;
        this.number = number;
        this.isPlased = '0';
        this.maxDiapazon= 0;
    }

    public setPlased(value?:'1'|'0'){
        this.isPlased = '1'||value;
    }

    public getWeight():number{
        return this.weigth
    }

    public getUtility(){
        return this.utility
    }

    public getNumber(){
        return this.number
    }

    public static setChance(items:Item[],alg?:number){
        if(alg == 7){
            items[0].itemChance={low:0,high:items[0].utility};
            let sum = 0;
            for(let i = 1; i< items.length;i++){
                items[i].itemChance={low:items[i-1].itemChance.high-1,high:items[i].utility+items[i-1].itemChance.high-1};
                sum+=items[i].utility;
            }   
            items[0].maxDiapazon=sum;
        }
        if(alg == 8){
            items[0].itemChance={low:0,high:items[0].utility/items[0].weigth};
            let sum = 0;
            for(let i = 1; i< items.length;i++){
                items[i].itemChance={low:items[i-1].itemChance.high,high:items[i].utility/items[0].weigth+items[i-1].itemChance.high};
                sum+=items[i].utility/items[i].weigth;
            }   
            items[0].maxDiapazon=sum;
        }
    }

    public static getMaxItem(items:Item[],alg?:number){
        let maxItem:Item; 
        let position = 0;
        const RAND_POINT = Math.random()*items[0]?.maxDiapazon;
        items.forEach((item,index)=>{
            if(item.itemChance.low<=RAND_POINT&&item.itemChance.high>RAND_POINT&&item.isPlased == '0'){
                position = index;
                maxItem = item;
                return;
            }
        })
        if(!maxItem){
            return undefined;
        }
        items[position].setPlased();
        items.splice(position,1);
        return maxItem;
    }

    public getStatus(){
        return this.isPlased;
    }
    public static countAllWeigth(items:Item[]){
        let sum = 0;
        items.forEach((item)=>{
            sum+=item.getWeight();
        })
        return sum;
    }
    public static generateItemMatrix(numOfItems:number){
        const items:Item[] = [];
        for(let i = 0; i<numOfItems; i++){
            const weigth = Math.floor(Math.random()*MAX_ITEM_WEIGTH)+1;
            const utility = Math.floor(Math.random()*MAX_ITEM_UTILITY);
            items.push(new Item(i,weigth, utility))
        }
        return items;
    }
}