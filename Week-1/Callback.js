let makePayment = (amount, mode) => {
   //console.log(`you have made a payment of ${amount} using ${mode.name}`);
    mode(amount);
}

let googlepay = () => {
    console.log("you have made a payment using googlepay");
}
let phonepe = () => {
    console.log("you have made a payment using phonepe");
}
let cardpayment = (amount) => {
    console.log(`you have made a payment of ${amount} using card`);
}
let cashpayment = (amount) => {
    console.log(`you have made a payment of ${amount} using cash`);
}

makePayment(2020200202, cashpayment)





//clousure in javascript
//everyjavascript function has clousre by default because of this clousre property teh variables of the uoutside scope
//will be maintained temporarily in the heap even the outisde function execution is completed and the inner function
//can access those varibales even after teh execution of the outside fucntion is completed and this is called 
//clousre example
function createGame(name){
    let levelnumber = 1;    
    return function level(){
        return `welcome ${name} to the game and you are at level ${levelnumber}`;
    }
}

let game = createGame("prabs");
console.log(game())

//how clousre is demostrated in aboeve program is that the inner function level() is able to access the ??

//variable name and levelnumber even after the execution of the createGame function is completed. 
//This is because of clousre property of javascript functions which allows
//the inner function to maintain a reference to the variables of  
//the outer function even after the outer function has finished executing.






//what is the mkstake in above program


//collections in javascript are data structures that allow us to store and manipulate multiple values in a single variable.
//examples of collections in javascript are arrays, objects, maps, sets etc.
//collections are used to store and manipulate data in a more organized and efficient way.


//why we need collections in javascript 
// because they provide us with a way to store and manipulate multiple values in a single variable,
//  which makes our code more organized and efficient. Collections also provide us 
// with various methods to manipulate the data stored in them, 
// which makes it easier to work with complex data structures.


//how many types of collections are there in javascript
// there are several types of collections in javascript, including:
// 1. Arrays: ordered list of values that can be of any type.
// 2. Objects: unordered collection of key-value pairs.
// 3. Maps: collection of key-value pairs where keys can be of any type.
// 4. Sets: collection of unique values of any type.
// 5. WeakMaps: collection of key-value pairs where keys are objects and values can be of any type, but the keys are weakly referenced.
// 6. WeakSets: collection of unique values where the values are objects and are weakly referenced.


//array is a collection of values that are ordered and can be of any type.
//example of array in javascript
let marks = [100, 26, 89, 67, "puck"];
console.log(marks);
marks.push(69696);
console.log(marks);


//for off loop for arrays in javascript
let markss = [23, 45, 67, 89, 90];
for (let mark of markss) {
    console.log(mark);
}

//object is a collection of key-value pairs where the keys are strings and the values can be of any type.
//example of object in javascript
let person = {
    name: "prabs",
    age: 23,
    city: "bangalore"
}
console.log(person);
person.country = "india";
console.log(person);

//for in loop for objects in javascript
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

//map is a collection of key-value pairs where keys can be of any type.
//example of map in javascript
let myMap = new Map();
myMap.set("name", "prabs");
myMap.set("age", 23);
myMap.set("city", "bangalore");
console.log(myMap);
myMap.set("country", "india");
console.log(myMap);

//for of loop for maps in javascript
for (let [key, value] of myMap) {
    console.log(`${key}: ${value}`);
}

//set is a collection of unique values of any type.
//example of set in javascript
let mySet = new Set();
mySet.add("prabs"); 
mySet.add(23);
mySet.add("bangalore");
console.log(mySet);
mySet.add("prabs");


//for of loop for sets in javascript
for (let value of mySet) {
    console.log(value);
}
//set vs map in javascript
// a set is a collection of unique values, while a map is a collection of key-value pairs. 
// In a set, each value can only occur once, while in a map, each key can only occur once but the values can be duplicated. 
// Sets are typically used when you want to store a collection of unique items, while maps are used when you want to associate values with specific keys.

//weakmaps and weaksets in javascript
// weakmaps and weaksets are similar to maps and sets, but they have some differences. 
// In a weakmap, the keys are objects and the values can be of any type, but the keys are weakly referenced. 
// This means that if there are no other references to the key object, it can be garbage collected. 
// In a weakset, the values are objects and are weakly referenced, which means that if there are no other references to the value object, it can be garbage collected. 
// Weakmaps and weaksets are typically used when you want to store data that should not prevent garbage collection of the objects used as keys or values.




let employees = [
{
    name: "prabs",
    age: 23,
    city: "bangalore"
},
{
    name: "surya",
    age: 24,
    city: "hyderabad"
},
{
    name: "sai",
    age: 22,
    city: "chennai"
}

]

employees.forEach((employee) => {
    console.log(`employee name is ${employee.name} and age is ${employee.age} and city is ${employee.city}`);   

});

for(let employee of employees){
    console.log(`${employee.name}`)
}



//nested objects in javascript
let company = {
    name: "abc",
    employees: [
        {
            name: "prabs",
            age: 23,
            city: "bangalore"
        },
        {
            name: "surya",
            age: 24,
            city: "hyderabad"
        },
        {
            name: "sai",
            age: 22,
            city: "chennai"
        }
    ]
}

//methods in javascript
// a method is a function that is associated with an object. 
// In javascript, we can define methods inside objects and they can be called using the object name followed by the method name. 
// Methods are used to perform actions on the data stored in the object or to manipulate the object itself.

let person1 = {
    name: "prabs",
    age: 23,
    city: "bangalore",
    marks: [100, 86, 89, 67],
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old and I live in ${this.city}`);
    },
    marrks: function(){
        for(let mark in marks){
            totall += mark
        }
        console.log(totall)
    }
}