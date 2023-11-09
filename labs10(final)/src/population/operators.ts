import { Item } from "src/item/item";
import { Population } from "./population";

type crossOperation = (parentOne: Population,parentTwo:Population,items:Item[],maxNumOfChilds?:number) => Population[];
type parentOperation = (population:Population[])=>{parentOne:Population,parentTwo:Population};
type mutationOp = (population: Population[],items:Item[]) => void;
type selectionOp = (population:Population[],numberOfCoding:number,maxWeight:number) => Population[];

//операторы кроссовера
export const crossOperations = new Map<string,crossOperation>([
    ['onePointCross',Population.onePointCross],
    ['uniformCross',Population.uniformCross],
])

//стратегия выбора родителя
export const parentOperations = new Map<string,parentOperation>([
    ['randParents',Population.getRandParents],
    ['autobreedingParents',Population.getAutobreedingParents]
])
 
//операторы мутации
export const mutationOperations = new Map<string,mutationOp>([
    ['geneticMutation',Population.geneticMutation],
    ["chromosomMutation", Population.chromosomeMutation],
    ["functionalMutation", Population.functionalMutation]
])

//операторы селекции
export const selectionOperations = new Map<string,selectionOp>([
    ['randomSelection',Population.selectionRoulette],
    ['randomSelectionLimit',Population.selectionRouletteLimit],
    ['tournamentSelection',Population.selectionTournament]
])