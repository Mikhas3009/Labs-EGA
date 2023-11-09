import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bag } from './bag/bag';
import { Item } from './item/item';
import { populationDto } from './dto';
import { Population } from './population/population';
import { crossOperations, mutationOperations, parentOperations, selectionOperations } from './population/operators';

type result = {
    coding:string;
    adaptation:number;
    weight:number;
    pokolenye:number;
}

const MAX_NOT_IMPRROVED = 5;

@Injectable()
export class AppService {
    async getItems(body:populationDto){
        const {items,maxWeight,population,crossOp,parentOp,mutationOp,selectionOp,numberOfCoding} = body;
        const myItems:Item[] =[];
        items.forEach((item,index)=>{
            myItems.push(new Item(index+1, item.weight, item.utility))
        })
        let myPopulation: Population[]=[];
        population.forEach((member)=>{
            myPopulation.push(new Population(member.coding,myItems,member.adaptation,member.weight));
        })
        const myBag = new Bag(maxWeight);
        if(!myBag.checkTask(myItems)){
            throw new HttpException("Некоректные данные задачи!",HttpStatus.BAD_REQUEST)
        }
        let unSuccessPop = 0;
        let numberOfIteration = 0;
        let iterations=[];
        let maxElem = Population.getBestInPopulation(myPopulation,maxWeight,myItems);
        const result:result={coding:maxElem.getCoding(),adaptation:maxElem.getAdaptation(),weight:maxElem.getWeight(),pokolenye:0}
        while(unSuccessPop<MAX_NOT_IMPRROVED){
            let parents:{parentOne:Population,parentTwo:Population}[] = [];
            while(myPopulation.length>1){
                parents.push(parentOperations.get(parentOp)(myPopulation))
            }
            let childs:Population[] =[] 
            parents.forEach(({parentOne,parentTwo})=>{
                childs.push(...crossOperations.get(crossOp)(parentOne,parentTwo,myItems))
            })
            mutationOperations.get(mutationOp)(childs,myItems);
            const newPopulation = selectionOperations.get(selectionOp)(childs,numberOfCoding,maxWeight);
            const currMaxElem = Population.getBestInPopulation(newPopulation,maxWeight,myItems);
            
            if(result.adaptation<currMaxElem.calcAdaptaion()&&currMaxElem.getWeight()<=maxWeight){
                result.adaptation = currMaxElem.getAdaptation();
                result.coding = currMaxElem.getCoding();
                result.weight = currMaxElem.getWeight();
                result.pokolenye = numberOfIteration+1;
                unSuccessPop=0;
            }
            else if(result.weight>maxWeight&&result.weight>currMaxElem.getWeight()){
                result.adaptation = currMaxElem.getAdaptation();
                result.coding = currMaxElem.getCoding();
                result.weight = currMaxElem.getWeight();
                result.pokolenye = numberOfIteration+1;
                unSuccessPop = 0;
            }
            else{
                unSuccessPop++;
            }
            numberOfIteration++;
            myPopulation=[];
            for(let i=0;i<newPopulation.length;i++){
                myPopulation.push(new Population(newPopulation[i].getCoding(),myItems));
            }
            iterations.push({population:newPopulation,pokolenie:numberOfIteration,maxElem:currMaxElem});
        }
        return {iterations:iterations,result:result};
    }
}
