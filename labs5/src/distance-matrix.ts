import { MAX_DISTANCE } from "./consts";

export function createMatrix(matrixSize:number){
    const matrix:number[][] = new Array(matrixSize);
    for (let i = 0; i < matrixSize; i++){
        matrix[i] = new Array(matrixSize);
    }
    for(let i =0; i<matrixSize;i++){
        for (let j = 0; j < matrixSize; j++){
            if(i == j){
                matrix[i][j] = NaN;
            }
            else{
                matrix[i][j] = Math.floor(Math.random()*MAX_DISTANCE);
                matrix[j][i] = matrix[i][j]; 
            }
        }
    }
    return matrix;
}

export function countDistances(S:number[],matrix:number[][]){
    
}