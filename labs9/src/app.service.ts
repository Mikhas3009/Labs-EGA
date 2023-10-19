import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemInterface } from './item/item-interface';
import { itemsDto } from './dto';
import { Bag } from './bag/bag';
import { Item } from './item/item';

type res = {
    shag:number,
    currWeight:number,
    currCash:number,
    currItemId:number,
    currItemWeight:number,
    currItemUtility:number
}

@Injectable()
export class AppService {
    async getItems(body:itemsDto){
        const {items,maxWeight,alg} = body;
        const myItems:Item[] =[];
        items.forEach((item,index)=>{
            myItems.push(new Item(index+1, item.weight, item.utility))
        })
        const myBag = new Bag(maxWeight);
        if(!myBag.checkTask(myItems)){
            throw new HttpException("Некоректные данные задачи!",HttpStatus.BAD_REQUEST)
        }
        let i =0;
        Item.setChance(myItems,alg)
        const response:res[]=[]
        while(true){
            Item.setChance(myItems,alg);
            const maxItem = Item.getMaxItem(myItems,alg);
            if(!maxItem){
                continue
            }
            console.log("Шаг:", i);
            console.log("Теущий вес ранца: ", myBag.getCurrentWeight());
            console.log("Теущая стоимость ранца: ", myBag.getCurrentPrice());
            console.log('Выбираемый предмет:',maxItem.getNumber(),' Вес :', maxItem.getWeight(), "Полезность: ",maxItem.getUtility(),"Удельная полезность: ",(maxItem.getUtility()/maxItem.getWeight()).toFixed(2));
            response.push({shag:i,currWeight:myBag.getCurrentWeight(),currCash:myBag.getCurrentPrice(),currItemId:maxItem.getNumber(),currItemWeight:maxItem.getWeight(),currItemUtility:maxItem.getUtility()})
            if(myBag.getMaxWeight()>=myBag.getCurrentWeight()+maxItem.getWeight()){
                myBag.putInBag(maxItem)
            }
            else{
                maxItem.setPlased('0');
                break;
            }
            i++;
        }
        return {response:response,bag:myBag,price:myBag.getCurrentPrice(),weight:myBag.getCurrentWeight()};
    }
}
