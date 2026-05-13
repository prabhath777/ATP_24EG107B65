arr = [1,2,3,4,5]

function search(arr,t){
    for( i = 0;i <arr.length;i++){
        if(arr[i] ===t){
            console.log("found at index " + i)
            return;
        }else{
            console.log("not found at index " )
        }
    }
}

console.log(search(arr,3));