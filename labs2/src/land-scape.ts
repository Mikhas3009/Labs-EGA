import { maxAdaptation } from "./consts";

export class LandScape {

    private adaptation : number;
    private coding : string;

    constructor (coding:string){
        this.coding = coding;
        this.adaptation=this.calcAdaptation(coding);
    }

    private calcAdaptation(coding?: string): number {
        return Math.floor(Math.random()*maxAdaptation);
    }

    public getCoding(){
        return this.coding;
    }

    public getAdaptation(){
        return this.adaptation;
    }

    public static getRandSi(landScape:LandScape[]):LandScape{
        return landScape[Math.floor(Math.random()*landScape.length)]
    }
}