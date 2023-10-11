import { MAX_ITEM_UTILITY, MAX_ITEM_WEIGTH } from "../consts";
import { ItemInterface } from "./item-interface";

// @ts-ignore
export class Item implements ItemInterface{
    private number:number;
    private weigth:number;
    private utility:number;
    private isPlased:'1'|'0';

    constructor(number:number,weigth:number, utility:number){
        this.weigth = weigth;
        this.utility =utility;
        this.number = number;
        this.isPlased = '0';
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

    public static getMaxItem(items:Item[]){
        let max = -Infinity;
        let maxItem:Item = items[0]; 
        let position = 0
        items.forEach((item,index)=>{
            if(max < item.utility/item.weigth&&item.isPlased == '0'){
                max = item.utility/item.weigth;
                position = index;
                maxItem = item;
            }
        })
        items[position].setPlased();
        return maxItem;
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