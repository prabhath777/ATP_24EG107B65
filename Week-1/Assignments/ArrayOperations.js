//assignment 1
//Assignment 1: Daily Temperature Analyzer

let temp = [32, 35, 28, 40, 38, 30, 42]

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

console.log("----------------------------------------------------------------------------------------------------------------------");


//Assignment 2: Online Course Name Processor
let courses = ["javascript", "react", "node", "mongodb", "express"];


//1. filter() courses with name length > 5
let filteredCourses = courses.filter(course => course.length > 5);
console.log(filteredCourses);
//2. map() to convert course names to uppercase
let upperCourses = courses.map(course => course.toUpperCase());
console.log(upperCourses);
//3. reduce() to generate a single string
// //"JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"
let String = courses
  .map(course => course.toUpperCase())
  .reduce((acc, curr, index, arr) =>
    index === arr.length - 1 ? acc + curr : acc + curr + " | "
  , "");
console.log(String);
//find() the course "react"
let React = courses.find(course => course === "react");
console.log(React);
//findIndex() of "node"
let nodee= courses.findIndex(course => course === "node");
console.log(nodee);



console.log("---------------------------------------------------------------------------------------------------");

let marks = [78, 92, 35, 88, 40, 67];






//     1. filter() marks ≥ 40 (pass marks)
//     2. map() to add 5 grace marks to each student
//     3. reduce() to find highest mark
//     4. find() first mark below 40
//     5. findIndex() of mark 92

let passedMarks = marks.filter(mark => mark >= 40);
console.log(passedMarks);

let graceMarks = marks.map(mark => mark + 5);
console.log(graceMarks);

let highestMark = marks.reduce((max, curr) =>
  curr > max ? curr : max
, marks[0]);
console.log(highestMark);

let Below40 = marks.find(mark => mark < 40);
console.log(Below40);

let indexx = marks.findIndex(mark => mark === 92);
console.log(indexx);