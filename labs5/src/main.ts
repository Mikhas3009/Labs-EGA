import { findClosest } from "./closest-sity";
import { MATRIX_SIZE } from "./consts";
import { createMatrix } from "./distance-matrix";

//Матрица расстояний
const maxtrix:number[][] = createMatrix(MATRIX_SIZE);
console.log(maxtrix);
//Массив городов(решение)
const S:number[] = [];
//Входные данные
let i = 1;
let si;
let sumDistance = 0;
const X:number[] = new Array(MATRIX_SIZE).fill(0).map((elem,i)=>i+1);
let xi:number;

//алгоритм
let index:number = Math.floor(Math.random()*MATRIX_SIZE);
[xi] = X.splice(index,1);
console.log('Шаг:',i-1);
console.log('Обход: ',S);
console.log('Выбранный город: ',xi);
i++;
si = xi;
S.push(si)
while (X.length > 0) {
    console.log('Шаг:',i-1);
    console.log('Обход: ',S);
    index = findClosest(xi,maxtrix,X);
    xi = X[index];
    X.splice(index,1);
    console.log('Выбранный город: ',xi);
    console.log("Расстояние от предыдущего до выбранного:", maxtrix[xi-1][si-1]);
    sumDistance +=maxtrix[xi-1][si-1];
    console.log("Суммарное расстояние: ",sumDistance);
    i++;
    si = xi;
    S.push(xi)
}
// console.log(maxtrix[S[0]][S[S.length-1]])
console.log("Итоговый обход: ",S, "Длина обхода: ",sumDistance+maxtrix[S[0]-1][S[S.length-1]-1])