import { IsNotEmpty } from "class-validator";
import { Item } from "./item/item";
import { ItemInterface } from "./item/item-interface";

export class itemsDto {
    @IsNotEmpty()
    alg : number;
    @IsNotEmpty()
    items:ItemInterface[];
    @IsNotEmpty()
    maxWeight:number;
}