import { maxAdaptation } from "./consts";

export class LandScape {

    private adaptation : number;
    private coding : string;

    constructor (coding:string, adaptation?:number){
        this.coding = coding;
        this.adaptation=adaptation||this.calcAdaptation(coding);
    }

    private calcAdaptation(coding?: string): number {
        return Number((5*Math.sin(Number('0b'+coding))+Math.log(Number('0b'+coding))).toFixed(2));
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

    public static printLandScape(landScape:LandScape[]):void {
        landScape.forEach((elem)=>{
            console.log("Кодировка: ",elem.getCoding(), " Приспособленность: ",elem.getAdaptation());
        })
    }

    public static maxAdaptation(landScape:LandScape[]):LandScape{
        let max = landScape[0].getAdaptation();
        let coding = '';
        landScape.forEach(elem => {
            if(max<elem.getAdaptation()){
                max = elem.getAdaptation();
                coding = elem.getCoding();
            }
        });
        return new LandScape(coding,max)
    }
}