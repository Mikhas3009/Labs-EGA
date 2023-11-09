//Случайная генерация без учета ограничений
function genRandomPopulation(items){
    let lengthPop = document.querySelectorAll(".limit-input")[2].children[1].value;
    const population = [];
    let maxAdaptation = 0;
    let bestCoding='';
    let bestWeight=0;
    for(let i = 0; i < lengthPop;i++){
        const {coding,adaptation,weight}= generateCoding(items);
        if(maxAdaptation<adaptation){
            maxAdaptation = adaptation;
            bestCoding = coding;
            bestWeight = weight;
        }
        population.push({coding:coding,adaptation:adaptation,weight:weight});
    }
    console.log(bestCoding,bestWeight,maxAdaptation)
    return {population:population,coding:bestCoding,adaptation:maxAdaptation,weight:bestWeight}
}


function genFunctionalPopulation(items){
    let lengthPop = document.querySelectorAll(".limit-input")[2].children[1].value;
    const population = [generateCoding(items)];
    let maxAdaptation = population[0].adaptation;
    let bestCoding= population[0].coding;
    let bestWeight = population[0].weight;
    for(let i = population.length; i < lengthPop;i++){
        let newElem = {};
        newElem.weight = 0;
        newElem.adaptation = 0;
        newElem.coding = ((Math.pow(Number('0b'+population[i-1].coding),3)+Math.floor(Math.random()*100))%Math.pow(2,items.length)).toString(2);
        while(newElem.coding.length<items.length){
            newElem.coding = '0' + newElem.coding;
        }
        items.forEach((elem,index)=>{
            if(newElem.coding[index] =='1'){
                newElem.adaptation+=elem.utility;
                newElem.weight += elem.weight;
            }
        })
        if(newElem.adaptation>maxAdaptation){
            maxAdaptation = newElem.adaptation;
            bestCoding = newElem.coding;
            bestWeight = newElem.weight;
        }
        population.push(newElem)
    }
    return {population:population,coding:bestCoding,adaptation:maxAdaptation,weight:bestWeight}
}
function generateCoding(items){
    let coding = '';
    let adaptation = 0;
    let currWeight = 0;   
    console.log(items.length);
    items.forEach(element => {
        isPlaced = Math.random()<0.5?'0':'1';
        if(isPlaced=='1'){
            adaptation+=element.utility;
            currWeight+=element.weight;
        }
        coding+=isPlaced;
    });
    return {coding:coding,adaptation:adaptation,weight:currWeight}

}
function genEvristicPopulation(items){
    let lengthPop = document.querySelectorAll(".limit-input")[2].children[1].value;
    const maxBagWeight = document.querySelectorAll(".limit-input")[0].children[1].value;
    const numberOfItems = document.querySelectorAll(".limit-input")[1].children[1].value;
    const population = [];
    let maxWeight=0,maxAdaptation=0,bestCoding = '';
    for(let i =0; i < lengthPop; i++){
        let weight = 0;
        let adaptation = 0;
        let solution = new Set();
        let itemsCopy=[];
        const spreading = [items[0].utility];
        for (let i = 0; i <items.length;i++){
            itemsCopy.push(items[i]);
            if(i!=0){
                spreading.push(items[i].utility+spreading[i-1]); 
            }
        }
        for(let j = 0;j< numberOfItems;j++){
            let {item,index} = getMaxElement.call(itemsCopy,spreading);
            if(weight+item.weight<= maxBagWeight){
                solution.add(item.id-1);
                weight+=item.weight;
                adaptation += item.utility;
            }
            else break;
        }
        let coding = '';
       
        for(let j=0;j<numberOfItems;j++){
            if(solution.has(j)){
                coding+='1'
            }
            else{
                coding+='0'
            }
        }
        if(adaptation>maxAdaptation){
            maxAdaptation= adaptation;
            maxWeight = weight;
            bestCoding = coding;

        }
        population.push({coding:coding,adaptation:adaptation,weight:weight});
    }
    return {population:population,coding:bestCoding,adaptation:maxAdaptation,weight:maxWeight}

}
function getMaxElement(spreading){
    let maxUtility = 0;
    let index = 0;
    let bestItem;
    let radius = Math.random()*spreading[spreading.length-1];
    if(radius<spreading[0]){
        bestItem = this[0];
        index = 0;
    }
    this.forEach((item,i)=>{
       if(radius>spreading[i]&&radius<spreading[i+1]){
            bestItem = item;
            index = i;
       }
    })
    this.splice(index,1);
    spreading.length = 0;
    spreading.push(this[0].utility)
    for (let i = 0; i <this.length;i++){
        if(i!=0){
            spreading.push(this[i].utility+spreading[i-1]); 
        }
    }
    return {item:bestItem,index:index};
}