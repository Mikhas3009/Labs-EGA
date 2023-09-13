//Импорты
import { N,n } from "./consts";
import { landScapeSearch } from "./landscape- search";
import { adaptation } from "./adaptation";

//Задаем пространство поиска:
const S:string[]= new Array(n)
landScapeSearch.call(S);
console.log("Пространство поиска:");
S.forEach((elem)=>{
    console.log("Кодировка: ",elem, "  Приспособленность: ",adaptation(elem))
})

//Задаем переменные 
let max:number = 0;
let maxS:string='';

//Алгоритм
for(let i =0; i<N; i++) {
    const currentIndex:number = Math.floor(Math.random()*S.length);
    const si:string = S[currentIndex];
    console.log("Шаг: ",i, "max: ",max, "maxS: ",maxS);
    console.log("Выбираемая кодировка: ",si, "Ее приспособленность: ",adaptation(si))
    if(max<adaptation(si)){
        max = adaptation(si);
        maxS = si;
        console.log("Новый максммум: ",maxS , "Приспособленность: ",maxS)
    }
}

//Итоговый результат
console.log('Лучшая Кодировка: ',maxS,"Приспособленность: ",max)