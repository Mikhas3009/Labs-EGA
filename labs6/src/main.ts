import { MATRIX_SIZE } from "./consts";
import { countDistances, createMatrix } from "./distance-matrix";
import { findCadidates } from "./find-candidates";
import { findDistance } from "./find-distance";
import { getCandidate } from "./get-candidate";
import { print } from "./printer";


const matrix = createMatrix(MATRIX_SIZE);
console.log(matrix);
//Массив городов(решение)
const S:number[] = [];
//Входные данные
let i = 1;
let si;
let sumDistance = 0;
let Z:number[] = []
const X:number[] = new Array(MATRIX_SIZE).fill(0).map((elem,i)=>i+1);
let xi:number;

//алгоритм
let index:number = Math.floor(Math.random()*MATRIX_SIZE);
[xi] = X.splice(index,1);
console.log('Шаг:',i-1);
console.log('Выбранный город: ',xi);
i++;
si = xi;
S.push(si);
Z = findCadidates(S,matrix,X);
print(S,Z,matrix);
X.splice(X.findIndex((elem)=>elem==Z[0]),1)
S.push(Z[0]);
console.log('Обход: ',S);
sumDistance= countDistances(S,matrix)
console.log("Суммарное расстояние: ",sumDistance);
while(X.length > 0){
    console.log('Шаг:',i-1);
    Z=findCadidates(S,matrix,X);
    print(S,Z,matrix);
    const para = getCandidate(S,Z,matrix);
    console.log("Выбранная пара: ", para);
    S.splice(para.position,0,para.candidat);
    X.splice(X.findIndex((elem)=>elem==para.candidat),1)
    i++;
    console.log('Обход: ',S);
    sumDistance= countDistances(S,matrix)
    console.log("Суммарное расстояние: ",sumDistance);
}
console.log('Итоговый Обход: ',S);
console.log('Итоговая Сумма: ',sumDistance+findDistance(S[S.length-1],S[0],matrix));