import { IsNotEmpty } from "class-validator";
import { Item } from "./item/item";
import { ItemInterface } from "./item/item-interface";

export class populationDto {

    @IsNotEmpty()
    parentOp:string;
    @IsNotEmpty()
    mutationOp:string;
    @IsNotEmpty()
    selectionOp:string;
    @IsNotEmpty()
    crossOp:string;
    @IsNotEmpty()
    population : [{coding:string,adaptation:number,weight:number}?];
    @IsNotEmpty()
    items:ItemInterface[];
    @IsNotEmpty()
    maxWeight:number;
    @IsNotEmpty()
    numberOfCoding:number;
}