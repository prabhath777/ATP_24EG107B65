let cv

console.log(typeof cv);
cv = 34
console.log(typeof cv);
cv = "rttr"
console.log(typeof cv);
cv = false
console.log(typeof cv);
cv =  []
console.log(typeof cv);


let b = 696969696;

console.log(b)

let v = b + 696969669969669;

console.log(v)  

//"==" compares only values
//"===" compares values and data types
//terenary operator syntax: condition ? value_if_true : value_if_false
let age = 18;
let isAdult = age >= 18 ? "Yes" : "No";
console.log(isAdult);   

//control flow statements
// if-else statement
//if else if
//iterative statements: for loop, while loop, do-while loop
//switch case statement



let markss = [23,45,67,89,90]

for(let i = 0;i < markss.length;i++){

    if(markss[i] > 80){
        console.log(markss[i]);
    }
}



// 1st program
let a = 69;
let c = 96;

if (a>c){
    console.log("a is greater than c");
}else{
    console.log("c is greater than a");
}


// 2nd program
let d = 34

if(a > c && a > d){
    console.log("a is greatest");
}if(c > a && c > d){
    console.log("c is greatest");
}else{
    console.log("d is greatest");
}

//3rd & 4th 
// program

let smallest = markss[0]
let total = 0
for(let i = 0;i < markss.length;i++){

    if (markss[i] <smallest){
        smallest = markss[i];
    }

    total += markss[i];
    
}

console.log(smallest);
console.log(total)
