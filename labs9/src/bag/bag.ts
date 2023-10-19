import { Item } from "../item/item";
import { BagInterface } from "./bag-interface";

// @ts-ignore
export class Bag implements BagInterface{
    
    private items:Item[];
    private maxWeight:number;

    constructor(maxWeight:number){
        this.items = [];
        this.maxWeight = maxWeight;
    }

    public checkTask(items:Item[]):boolean{
        return Item.countAllWeigth(items)>= this.maxWeight?true:false;
    }

    public printBag(){
        console.log(this.items)
    };

    public putInBag(item:Item){
        this.items.push(item);
        return item;
    };

    public getMaxWeight(){
        return this.maxWeight
    }

    public getCurrentWeight(){
        let sumWeight = 0;
        this.items.forEach((item,index)=>{
            sumWeight += item.getWeight();
        })
        return sumWeight;
    }

    public getCurrentPrice(){
        let sumPrice = 0;
        this.items.forEach((item,index)=>{
            sumPrice += item.getUtility();
        })
        return sumPrice;
    }
}