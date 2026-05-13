//assignment 1

const temp = [32, 35, 28, 40, 38, 30, 42]

//filter() temperatures above 35
let fil = temp.filter((element)=>element>35)
console.log(fil)

//map() to convert all temperatures from Celsius → Fahrenheit
//f = c*1.8+32
let Fahrenheit = temp.map((elemnets)=>elemnets= elemnets*1.8+32)
console.log(Fahrenheit)

//reduce() to calculate average temperature
let average = temp.reduce((accumulator,element)=>accumulator+element/temp.length)
console.log(average)

//find() first temperature above 40
let fi = temp.find((element)=>element>40)
console.log(fi)

//findIndex() of temperature 28
let index = temp.findIndex((element)=>element==28)
console.log(index)

