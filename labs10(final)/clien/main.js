const generationItemsButton = document.querySelector(".generation-items-button").children[0];
const generationButton = document.querySelector(".generation-button").children[0];
const resultButton = document.querySelector(".submit-button").children[0];
const itemList = document.querySelector(".item-list");
const populationList = document.querySelector(".populations");
const knapsackLimit = document.querySelector('input[name="knapsackLimit"]');
const numberOfItems = document.querySelector('input[name="numberOfItems"]');
const radioButtons = document.querySelectorAll('input[name="algorithm"]');
const iterations = document.querySelector('.iterations');
const fileInput = document.getElementById('items');

const CODING_LENGTH = 10;
const items = [];
let currPopulation = [];
//generateItems();
//generatePopulation();
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e)=>{
        const data = JSON.parse(e.target.result);
        items.length = 0;
        deleteItems(itemList)
        data.items.forEach((item,index)=>{
            itemList.innerHTML  += `\n      <div class="item">\n        <span class="item-value">Номер: </span>\n        <span class="item-weight">${item.id}</span>\n        <span class="item-value">Вес: </span>\n        <span class="item-weight">${item.weight}</span>\n        <span class="item-value">Ценность: </span>\n        <span class="item-weight">${item.utility}</span>\n      </div>\n`
            items.push(item);
        })
        knapsackLimit.value = data.maxWeight;
        numberOfItems.value = data.numberOfItems;
        knapsackLimit.readOnly = true;
        numberOfItems.readOnly = true;
    };
    reader.readAsText(file)
  });

generationItemsButton.addEventListener("click",() => {
    deleteItems(itemList);
    items.length = 0;
    knapsackLimit.readOnly = false;
    numberOfItems.readOnly = false;
    generateItems();
    console.log("Backend top");
});
generationButton.addEventListener('click',() => {
    deleteItems(populationList);
    generatePopulation();
})
window.addEventListener('load', () => {
    generatePopulation();
  });

resultButton.addEventListener("click",() => {
    const radioButtonsCross  = document.querySelectorAll('input[name="cross"]');
    const radioButtonsParent = document.querySelectorAll('input[name="parents"]');
    const radioButtonsMutation = document.querySelectorAll('input[name="mutation"]');
    const radioButtonsChromosom = document.querySelectorAll('input[name="selection"]');
    const crossOp = Array.from(radioButtonsCross).find((elem)=>elem.checked).value;
    const parentOp = Array.from(radioButtonsParent).find((elem)=>elem.checked).value;
    const mutationOp = Array.from(radioButtonsMutation).find((elem)=>elem.checked).value;
    const chromosomOp = Array.from(radioButtonsChromosom).find((elem)=>elem.checked).value;
    console.log(parentOp,crossOp,mutationOp,chromosomOp)
    let maxWeight = document.querySelector(".limit-input").children[1].value;
    let numberOfCoding = document.querySelectorAll(".limit-input")[2].children[1].value;
    console.log(numberOfCoding)
    const sendingData = {
        crossOp:crossOp,
        parentOp:parentOp,
        mutationOp:mutationOp,
        selectionOp:chromosomOp,
        population:currPopulation,
        items: items,
        maxWeight:maxWeight,
        numberOfCoding:numberOfCoding
    }
    fetch('http://localhost:3000',{
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        method: "POST",
        body:JSON.stringify(sendingData)
    })
    .then((response) => {
        if(response.status == 400){
            console.log("Некоректные данные задачи!!!")
        }
        console.log(response)
        return response.json();
    })
    .then(data=>{
        console.log(data);
        if(data.status!= 400){
            iterations.innerHTML = "";
            genetateResult(data.iterations,data.result,iterations);
        }
        else{
            iterations.innerHTML = "<p>Задача неккоректна! Уменьшите вес ранца</p>";
        }
    })

})

function generateItems(){
    const maxBagWeight = document.querySelectorAll(".limit-input")[0].children[1].value;
    const numberOfItems = document.querySelectorAll(".limit-input")[1].children[1].value;
    console.log({weight:maxBagWeight,numberOfItems:numberOfItems});
    const input = document.querySelector('input[name="items"]');
    input.value ='';
    let sumWeigth = 0;
    for(let i = 0; i< numberOfItems;i++){
        const id = i+1;
        const cost = Math.floor(Math.random() * 25)+1;
        const weight = Math.floor(Math.random()*25)+1;
        sumWeigth+=weight;
        itemList.innerHTML  += `\n      <div class="item">\n        <span class="item-value">Номер: </span>\n        <span class="item-weight">${id}</span>\n        <span class="item-value">Вес: </span>\n        <span class="item-weight">${weight}</span>\n        <span class="item-value">Ценность: </span>\n        <span class="item-weight">${cost}</span>\n      </div>\n`
        items.push({id: id, utility: cost,weight:weight,isPlaced:'0'});
    }
    if(maxBagWeight>sumWeigth){
        alert("Уменьшите вес ранца или увеличте число предметов!!!\n Задача неккоректна")
        itemList.innerHTML='';
    }
}

function deleteItems(itemList){
    itemList.innerHTML = "";
}
function genetateResult(iterations,result,nodeList){
    const{coding, weight, pokolenye, adaptation } = result;
    let resultCoding = document.querySelectorAll('p')[10]
    let resutlAdaptation = document.querySelectorAll('p')[11]
    let resutlWeigth = document.querySelectorAll('p')[12];
    let resutlPokolenye = document.querySelectorAll('p')[13]
    resultCoding.innerHTML = "Кодировка: ";
    resutlAdaptation.innerHTML = "Приспособленность: ";
    resutlWeigth.innerHTML = "Вес: ";
    resutlPokolenye.innerHTML = "Поколение: ";
    if(weight>knapsackLimit.value){
        resultCoding.innerHTML+="Оптимального решения не найдено!";
    }
    else{
    resultCoding.innerHTML +=coding;
    resutlAdaptation.innerHTML+= adaptation;
    resutlWeigth.innerHTML +=weight;
    resutlPokolenye.innerHTML+=pokolenye;
    }
    console.log(result)
    iterations.forEach(({maxElem,pokolenie,population})=>{
        nodeList.innerHTML +=`\n      <div class="iteration">\n        <div class="item">Поколение: ${pokolenie}, Лучшая кодировка: ${maxElem.coding}, Приспособленность: ${maxElem.adaptaion}, Вес: ${maxElem.weight}<br> Популяция:<br> ${elemntCreater(population)}<br> `

    })

}

function generatePopulation(){
    let alg = Array.from(radioButtons).find((elem)=>elem.checked).value;
    const {population, coding,adaptation,weight} = algsMap.get(alg)(items);
    currPopulation = population;
    populationList.innerHTML += "<p>Начальная популяция: </p>";
    populationList.innerHTML += `<p>Лучшая кодировка: ${coding}; Приспособленность: ${adaptation}; Вес: ${weight}</p>`;
    population.forEach(({coding,adaptation,weight})=>{
        populationList.innerHTML  += `\n      <div class="item">\n        <span class="item-value">Кодировка: </span>\n        <span class="item-weight">${coding}</span>\n        <span class="item-value">Вес: </span>\n        <span class="item-weight">${weight}</span>\n        <span class="item-value">Приспособленность: </span>\n        <span class="item-weight">${adaptation}</span>\n      </div>\n`
    })
}

function elemntCreater(population){
    let resultStr = '\n'
    population.forEach((elem)=>{
        resultStr+=`Кодировка: ${elem.coding}, Приспособленность: ${elem.adaptaion}, Вес: ${elem.weight}<br> `;
    })
    return resultStr;
}