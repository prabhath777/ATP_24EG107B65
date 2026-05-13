//1
let a = 12
let b = 25
if(a > b){
    console.log(a)
}else{
    console.log(b)
}

//2
let x = 10
let y = 40
let z = 30
let big

if(x > y && x > z){
    big = x
}else if(y > x && y > z){
    big = y
}else{
    big = z
}

console.log(big)

//3
let marks = [90,78,65,98]
let sum = 0

for(let i=0;i<marks.length;i++){
    sum = sum + marks[i]
}

console.log(sum)

//4
let small = marks[0]

for(let i=1;i<marks.length;i++){
    if(marks[i] < small){
        small = marks[i]
    }
}

console.log(small)

//5
function biggest(a,b,c){
    let big
    if(a>b && a>c){
        big = a
    }else if(b>a && b>c){
        big = b
    }else{
        big = c
    }
    return big
}

console.log(biggest(5,8,3))

//6
function arraySum(arr){
    let total = 0
    for(let i=0;i<arr.length;i++){
        total = total + arr[i]
    }
    return total
}

console.log(arraySum([1,2,3,4]))

//7
function search(arr,element){
    for(let i=0;i<arr.length;i++){
        if(arr[i] === element){
            return i
        }
    }
    return "not found"
}

console.log(search([10,20,30,40],30))