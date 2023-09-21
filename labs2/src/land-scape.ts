import { L, maxAdaptation } from "./consts";

export class LandScape {

    private adaptation : number;
    private coding : string;

    constructor (coding:string){
        this.coding = coding;
        this.adaptation=this.calcAdaptation(coding);
    }

    private calcAdaptation(coding?: string): number {
        let num = Number("0b"+coding);
        return Math.pow((num-Math.pow(2,(L-1))),2)
      //  return Math.floor(Math.random()*maxAdaptation);
    }

    public getCoding(){
        return this.coding;
    }

    public getAdaptation(){
        return this.adaptation;
    }

    public static printLandScape(landScape:LandScape[]):void {
        landScape.forEach((elem)=>{
            console.log("Кодировка: ",elem.getCoding(), " Приспособленность: ",elem.getAdaptation());
        })
    }

    public static getRandSi(landScape:LandScape[]):LandScape{
        return landScape[Math.floor(Math.random()*landScape.length)]
    }
}