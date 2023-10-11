import { Bag } from "./bag/bag";
import { MAX_WEIGTH, N } from "./consts";
import { Item } from "./item/item";

//Получаем список предметов...
const items = Item.generateItemMatrix(N)
//создаем портфель
const myBag = new Bag(MAX_WEIGTH);
//проверка на корректность задачи
const isCorrectTask = myBag.checkTask(items);
if(isCorrectTask){

    //алгоритм
    console.log('Предметы: ',items);
    console.log('Максимальный вес ранца: ', myBag.getMaxWeight());
    let i =0;
    while(true){
        console.log("Шаг:", i);
        console.log("Теущий вес ранца: ", myBag.getCurrentWeight());
        console.log("Теущая стоимость ранца: ", myBag.getCurrentPrice());
        const maxItem = Item.getMaxItem(items);
        console.log('Выбираемый предмет:',maxItem.getNumber(),' Вес :', maxItem.getWeight(), "Полезность: ",maxItem.getUtility());
        if(myBag.getMaxWeight()>=myBag.getCurrentWeight()+maxItem.getWeight()){
            myBag.putInBag(maxItem)
        }
        else{
            maxItem.setPlased('0');
            break;
        }
        i++;
    }
    console.log("Итоговое решение: ");
    myBag.printBag()
    console.log("Цена: ", myBag.getCurrentPrice());
    console.log("Вес: ", myBag.getCurrentWeight());
}
else{
    console.log("Задача неккоректна!!!!!");
}