export function findClosest(sity:number,matrix:number[][],X:number[]){
    let distance:number = Infinity;
    let index = 0;
    for(let i =0; i < X.length; i++){
        if(distance>matrix[sity-1][X[i]-1]){
            distance = matrix[sity-1][X[i]-1];
            index = i;
        }
    }
    return index;
}