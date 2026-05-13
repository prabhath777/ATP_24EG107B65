
//objects in javascript 



let person = {
    name:"prabs",
    age:19,
    gender:"male"
}


//Add a new property
person.rollno = '24eg107b65'
console.log(person)
//update a new property
person.name = 'prabhath'
console.log(person)
//delete a proeprty
delete person.gender
console.log(person)


//call back fucntion
// a fucntion that passed as arguemnet for onther function

let test = [20,70,45,19,30,75,99,120]

//filter 
//console.log(test)

let t = test.filter((element) => element> 50)

//console.log(t)

let b = test.filter((elements) => elements > 10 && elements < 80)
//console.log(b)

//map method

let m = test.map((elements)=> elements + 10 )
//console.log(m)

let r = test.map((elements)=>{
   if( elements < 50)
    return elements+10
   else(elements>50)
   return elements-20
})

console.log(r)


//reduce method
//it recieves two parameters
//accumulator and value
//bascially acts as accmulator in processor 

const sum = test.reduce((acc,element)=>acc+element,10)
console.log(sum)

const big = test.reduce((acc,element)=>{
       n = Math.max(acc,element)    
        return n

      
})

console.log(big)

const small = test.reduce((acc,element)=>{
    if(acc<element)
        return acc
    else(acc=element)
        return acc
})

console.log(small)


const bigg = test.reduce((acc,element)=>{
    if(acc>element)
        return acc
    else(acc=element)
        return acc
})

console.log(bigg)


//find and findindex

let pos = test.find((element)=> element==12340)
console.log(pos)

let pi = test.findIndex((ele) => ele==120)
console.log(pi)

//sort
//sort method modifies the oginal array
//use toSorted() for having duplicate sorted array
let sorted =  test.sort()
console.log(sorted)
//sorted method uses lexical comparaission

//to make the real sorting

let sort = test.sort((a,b)=>a-b)
console.log(sort)


//reverse()
let rev = test.reverse()
console.log(rev)



//assignment 

const temp = [32, 35, 28, 40, 38, 30, 42]

//filter() temperatures above 35


let fil = test.filter((element)=>element>35)
console.log(fil)


const students = [
  { id: 1, name: "Ravii", marks: 78 },
  { id: 2, name: "Anjap", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

let total = students.reduce((a,b)=>a+b.marks,0)
console.log(total)