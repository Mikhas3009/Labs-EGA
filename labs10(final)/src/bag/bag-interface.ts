import { Item } from "../item/item";


export interface BagInterface{
    items:Item[];
    maxWeight:number;
    printBag:()=>void;
    putInBag:(item:Item)=>Item
}