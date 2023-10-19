const generationButton = document.querySelector(".generation-button").children[0];
const resultButton = document.querySelector(".submit-button").children[0];
const itemList = document.querySelector(".item-list");
const radioButtons = document.querySelectorAll('input[type="radio"]');
const iterations = document.querySelector('.iterations');

const items = [];
generateItems();

generationButton.addEventListener("click",() => {
    items.length = 0;
    deleteItems(itemList);
    generateItems();
    console.log("Backend top");
    console.log(items)
});

resultButton.addEventListener("click",() => {
    let alg = '';
    radioButtons.forEach((radio) => {
        if (radio.checked) {
           alg = radio.value;
        }
    })
    let maxWeight = document.querySelector(".limit-input").children[1].value;
    const sendingData = {
        alg: alg,
        items: items,
        maxWeight:maxWeight
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
        return response.json();
    })
    .then(data=>{
        console.log(data);
        if(data.status!= 400){
            iterations.innerHTML = "";
            genetateResult(data.response,data.weight,data.price);
            console.log(data);
        }
        else{
            iterations.innerHTML = "<p>Задача неккоректна! Уменьшите вес ранца</p>";
        }
    })

})

function generateItems(){
    const numberOfItems = document.querySelectorAll(".limit-input")[1].children[1].value;
    for(let i = 0; i< numberOfItems;i++){
        const id = i+1;
        const cost = Math.floor(Math.random() * 25)+1;
        const weight = Math.floor(Math.random()*25)+1;
        itemList.innerHTML  += `\n      <div class="item">\n        <span class="item-value">Номер: </span>\n        <span class="item-weight">${id}</span>\n        <span class="item-value">Вес: </span>\n        <span class="item-weight">${weight}</span>\n        <span class="item-value">Ценность: </span>\n        <span class="item-weight">${cost}</span>\n      </div>\n`
        items.push({id: id, utility: cost,weight:weight,idPlaced:'0'});
    }
}

function deleteItems(itemList){
    itemList.innerHTML = "";
}

function genetateResult(res,weight,cost){
    let resultCash = document.querySelectorAll('p')[1]
    let resutlWeigth = document.querySelectorAll('p')[2]
    resultCash.innerHTML="Итоговая Стоимость: ";
    resutlWeigth.innerHTML="Итоговый Вес: ";
    res.forEach((iteration)=>{
        iterations.innerHTML +=`\n      <div class="iteration">\n        <div class="item">Шаг: ${iteration.shag}, Теущий вес ранца: ${iteration.currWeight}, Теущая стоимость ранца:  ${iteration.currCash} <br> Выбираемый предмет: ${iteration.currItemId}, Вес: ${iteration.currItemWeight}, Стоимость: ${iteration.currItemUtility}, Удельная стоимость: ${(iteration.currItemUtility/iteration.currItemWeight).toFixed(2)} </div>\n</div>\n`
    })
    resultCash.innerHTML+=" "+ cost;
    resutlWeigth.innerHTML+=" "+ weight;
}