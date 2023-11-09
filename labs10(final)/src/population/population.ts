import { Item } from "src/item/item";

const MAX_NUM_CHILDS = 15;
const MUTATION_PROBABILITY = 0.2;
export class Population{

    constructor(coding: string,items:Item[],adaptation?:number,weight?:number){
        this.items = [];
        this.coding = coding;
        for(let i = 0; i < items.length;i++){
            this.items.push(new Item(items[i].getNumber(),items[i].getWeight(),items[i].getUtility()));
               if(coding[i]==='1'){
                     this.items[i].setPlased('1');
                }
        }
        this.adaptaion = this.calcAdaptaion();
        this.weight = this.calcWeight();
    }
    private coding :string;
    private adaptaion:number;
    private weight:number;
    private items:Item[];

    public getSizeCoding(){
        return this.coding.length;
    }

    public getCoding(){
        return this.coding;
    }
    public getAdaptation(){
        return this.adaptaion;
    }
    
    public getWeight(){
        return this.weight;
    }

    public calcWeight(){
        let weight = 0;
        this.items.forEach((item)=>{
            if(item.getStatus()==='1'){
                weight+=item.getWeight();
            }
        })
        this.weight = weight;
        return weight;
    }

    public calcAdaptaion(){
        let adaptaion = 0;
        this.items.forEach((item)=>{
            if(item.getStatus()==='1'){
                adaptaion+=item.getUtility();
            }
        })
        this.adaptaion = adaptaion;
        return adaptaion;
    }
    //Стратегия выбора родителя
    public static getRandParents(population: Population[]){
        if(population.length<=1){
            return null;
        }
        const [parentOne] = population.splice(Math.floor(Math.random()*population.length),1)
        const [parentTwo] = population.splice(Math.floor(Math.random()*population.length),1)
        return {parentOne:parentOne,parentTwo:parentTwo}
    }

    public static getAutobreedingParents(population: Population[]){
        if(population.length<=1){
            return null;
        }
        let maxDifference = 0;
        let parentTwoIndex = 0;
        let [parentOne] = population.splice(Math.floor(Math.random()*population.length-1),1)
        for(let i = 0; i < population.length; i++){
            const difference = (Number('0b'+parentOne.coding) ^ Number('0b'+population[i].coding)).toString(2);
            const numberOf1 = difference.match(/[1]/g)?.length||0;
            if(maxDifference<numberOf1){
                maxDifference = numberOf1;
                parentTwoIndex = i;
            }
        }
        let [parentTwo] = population.splice(parentTwoIndex,1)
        return {parentOne:parentOne,parentTwo:parentTwo}
    }


    //Кроссоверы
    public static onePointCross(parentOne: Population, parentTwo: Population,items:Item[],maxNumOfChilds?:number){
        let numOfChilds = Math.floor(Math.random()*maxNumOfChilds||MAX_NUM_CHILDS)+2;
        const childs:Population[]=[];
        for(let i = 0; i < numOfChilds; i++){
            const point = Math.floor(Math.random()*parentOne.getSizeCoding());
            const firstPart = parentOne.coding.slice(0,point);
            const secondPart = parentTwo.coding.slice(point);
            childs.push(new Population(firstPart+secondPart,items))
        }
        return childs;
    }

    public static uniformCross(parentOne: Population, parentTwo: Population,items:Item[],maxNumOfChilds?:number){
        let numOfChilds = Math.floor(Math.random()*maxNumOfChilds||MAX_NUM_CHILDS)+2;
        const childs:Population[]=[];
        for(let i = 0; i < numOfChilds; i++){
            let child = '';
            for(let j=0;j<parentOne.getSizeCoding();j++){
                child += Math.random()<0.5?parentOne.coding[j]:parentTwo.coding[j];
            }
            childs.push(new Population(child,items));
        }
        return childs;
    }

    //Операторы Мутации
    public static geneticMutation(population:Population[],items:Item[]){
        for(let i = 0; i <population.length;i++){
            if(MUTATION_PROBABILITY>= Math.random()){
                const index = Math.floor(Math.random()*population[i].getSizeCoding());
                const coding = population[i].coding.split('');
                if(population[i].coding[index]=='1'){
                    coding[index] = '0'
                }
                else{
                    coding[index] = '1'
                }
                population[i] = new Population(coding.join(''),items)
            }
        }
    }

    public static chromosomeMutation(population:Population[],items:Item[]){
        for(let i = 0; i <population.length;i++){
            if(MUTATION_PROBABILITY>= Math.random()){
                const coding = population[i].coding.split('');
                for(let j = 0; j < coding.length; j++){
                    if(coding[j]=='0'){
                        coding[j] = '1';
                    }
                    else{
                        coding[j] = '0';
                    }
                }
                population[i] = new Population(coding.join(''),items)
            }
        }
    }

    public static functionalMutation(population:Population[],items:Item[]){
        for(let i =1; i < population.length; i++){
            if(MUTATION_PROBABILITY>= Math.random()){
                let coding = ((Math.pow(Number('0b'+population[i-1].coding),3)+Math.floor(Math.random()*100))%Math.pow(2,items.length)).toString(2);
                while(coding.length<items.length){
                    coding = '0' + coding;
                }
                population[i] = new Population(coding,items);
            }
        }
    }

    //Операторы Селекции
    public static selectionRoulette(childs:Population[],numberOfCoding:number,maxWeight:number){
        let spreading = [childs[0].adaptaion];
        if(childs.length==numberOfCoding){
            return childs;
        }
        const newPopulation:Population[]=[];
        while(newPopulation.length<numberOfCoding){
            spreading = Population.setSpreading(spreading,childs);
            newPopulation.push(Population.findElemInDiapazon(spreading,childs));
        }
        return newPopulation;
    }
    public static selectionRouletteLimit(childs:Population[],numberOfCoding:number,maxWeight:number){
        let spreading = [childs[0].adaptaion];
        if(childs.length==numberOfCoding){
            return childs;
        }
        const newPopulation:Population[]=[];
        while(newPopulation.length<numberOfCoding){
            spreading = Population.setSpreading(spreading,childs);
            const elem = Population.findElemInDiapazon(spreading,childs);
            if(elem.weight<=maxWeight){
                newPopulation.push(elem);  
            }
        }
        return newPopulation;
    }

    public static selectionTournament(childs:Population[],numberOfCoding:number,maxWeight:number){
        let groups:Population[][] = [[childs[0]]];
        if(childs.length==numberOfCoding){
            return childs;
        }
        const groupSize = Math.floor(childs.length/numberOfCoding)
        for(let i = 0; i <numberOfCoding;i++){
            groups = [...groups,childs.splice(0,groupSize)];
        }
        groups.pop()
        const newPopulation:Population[] = [];
        groups.forEach((group,index)=>{
            let maxElem:Population= new Population(group[0].coding,group[0].items);
            // let minElemWeigth:Population = new Population(group[0].coding,group[0].items);
            group.forEach((elem)=>{
                if(elem.adaptaion>maxElem?.adaptaion&&elem?.weight<=maxWeight){
                    maxElem = new Population(elem.coding,elem.items);
                }
                // if(elem?.weight<minElemWeigth?.weight){
                //     minElemWeigth = new Population(elem.coding,elem.items)
                // }
            })
            if(maxElem){
                newPopulation.push(new Population(maxElem.coding,maxElem.items));
            }
            // else{
            //     newPopulation.push(new Population(minElemWeigth.coding,minElemWeigth.items))
            // }
        });
        return newPopulation;
    }

    public static getBestInPopulation(population:Population[],maxWeight:number,items:Item[]){
        const isCorrect = population.filter((elem)=>elem.weight<=maxWeight);
        if(isCorrect.length==0){
            let minElemWeigth:number = Infinity;
            let index = 0;
            for(let i = 0;i<population.length;i++){
                if(minElemWeigth>population[i].weight){
                    minElemWeigth = population[i].weight;
                    index = i;
                }
            }
            return population[index];
        }
        else{
            let index =0;
            let maxAdapt= 0;
            for(let i = 0;i<isCorrect.length;i++){
                if(maxAdapt<isCorrect[i].adaptaion){
                    maxAdapt = isCorrect[i].adaptaion;
                    index = i;
                }
            }
            return isCorrect[index];
        }
    }

    private static setSpreading(spread:number[],population:Population[]){
        spread.length =0;
        spread = [population[0]?.adaptaion];
        for(let i = 0; i <population.length;i++){
            if(i!=0){
                spread.push(population[i].adaptaion+spread[i-1]); 
            }
        }
        return spread;
    }
    private static findElemInDiapazon(spread:number[],population:Population[]){
        let randRulette = Math.random()*spread[spread.length-1];
        let index: number;
        if(randRulette<spread[0]){
            index = 0;
        }
        for(let i = 0; i <population.length;i++){
            if(randRulette>spread[i]&&randRulette<spread[i+1]){
                index = i;
           }
        }
        const [elem] =  population.splice(index,1);
        return elem
    }
}