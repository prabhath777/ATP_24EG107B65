//functions is a block of code that performs a specific task
//functions are reusable and can be called multiple times
//function syntax
// function functionName(parameters){
//     //code to be executed
// }



function greet(name){
    console.log("Hello " + name);
}   

greet("pullarao")


//lowercamelCase is the convention for naming functions in JavaScript
//function with return value
function add(a,b){
    return a + b;
}

let sum = add(5,10);
console.log(sum)

//why we use lowercamelCase for naming functions in JavaScript?
//lowercamelCase is a convention for naming functions in JavaScript 
//because it improves readability and makes it easier to distinguish between functions and variables. 
//It also helps to avoid naming conflicts with reserved keywords in JavaScript.

//what are parameters and arguments in JavaScript functions?
//parameters are the variables that are defined in the function declaration 
// and are used to receive values when the function is called. 
//arguments are the actual values that are passed to the function when it is called. 
//for example, in the function declaration function add(a,b), a and b are parameters,
//  and when we call the function add(5,10), 5 and 10 are arguments.

//exmaple of function with parameters and arguments
function addition(z,x){
    return z + x;
}
let r = addition(2323433,3456543)
console.log(r)


//why in js we get undefined and why we get garbage values in c and c++?
//In JavaScript, when a variable is declared but not assigned a value, it is automatically assigned the value of undefined. 
//This is because JavaScript is a dynamically typed language and does not require variables to be declared with a specific data type. 
//On the other hand, in C and C++, when a variable is declared but not initialized, it may contain
//garbage values because the memory allocated for that variable may contain random data from previous usage. 
//This can lead to unpredictable behavior if the program tries to use that variable without initializing it first.

//types of fucntions in JavaScript
//1. Function declaration
//2. Function expression
//3. Arrow function 

//function declaration
function greet(name){
    console.log("Hello " + name);
}   

//explain function declaration in claerly with analogy
//Think of a function declaration like writing a recipe in a cookbook.
//The recipe (function) defines what steps to take and what ingredients are needed (parameters).
//When you want to make the dish (call the function), you follow the recipe with specific ingredients (arguments).
//The function declaration is like the blueprint of the recipe, and calling it is like following that blueprint.
//function expression example easy one
let meet = function(name){
    console.log("Hi " + name);
}

//function expression vs function declaration
//1. Function declaration is hoisted, which means it can be called before it is defined in the code. 
//Function expression is not hoisted, which means it cannot be called before it is defined in the code.
//2. Function declaration has a name, while function expression can be anonymous (without a name).
//3. Function declaration is more suitable for defining functions that are meant to be used throughout the code, 
//   while function expression is more suitable for defining functions that are meant to be used as callbacks or passed as arguments to other functions.
// 4. Function declaration is more readable and easier to understand, while function expression can be less readable and harder to understand, especially if it is anonymous.

//funxtion declaration vs expression with example
//function declaration example
function add(a,b){
    return a + b;
}
console.log(add(5,10));
//function expression example
let summ = function(a,b){
    return a + b;
}   



function helloooo(name,age){
    console.log(`hello ra ${name} mama nee age is ${age}`)
}

helloooo("prabs",18)






//arrow fucntions explained
//arrow functions are a shorter syntax for writing function expressions in JavaScript.
//They are defined using the "=>" syntax and do not have their own "this" context. 
//Arrow functions are often used for writing concise and anonymous functions, especially 
//in situations where a function is used as a callback or passed as an argument to another function. 

//arrow function example
let greett = (name) => {
    console.log("Hello " + name);
}

//arrow fucntion vs function expression
//1. Arrow functions have a shorter syntax compared to function expressions.
//2. Arrow functions do not have their own "this" context, while function expressions do.
//3. Arrow functions cannot be used as constructors, while function expressions can be used as constructors.
//4. Arrow functions are always anonymous, while function expressions can be named or anonymous.
//5. Arrow functions are more suitable for writing concise and anonymous functions, 
//while function expressions are more suitable for defining functions that are meant to be used throughout the code.



//arrow fucntions vs function declaration example
//function declaration example
function greet(name){
    console.log("Hello " + name);
}   
greet("prabs")
//arrow function example
let greettt = (name) => {
    console.log("Hello " + name);
}
  
//function expression vs arrow function example
//function expression example
let meeet = function(name){
    console.log("Hi " + name);
}
//arrow function example
let meett = (name) => {
    console.log("Hi " + name);
}

//why functions are imp in javascript and mern stack development?
//Functions are important in JavaScript and MERN stack development because they allow developers to break down complex problems into smaller, more manageable pieces of code. 
//Functions also promote code reusability, which can save time and reduce errors. 
//In MERN stack development, functions are used to handle various tasks such as handling user input, making API calls, and manipulating data. 
//Functions also play a crucial role in the development of React components, which are the building blocks of a React application. 
//Overall, functions are essential for writing clean, efficient, and maintainable code in JavaScript and MERN stack development.

//fucntion expression scenario example  
//function expression is useful when we want to define a function that is only used in 
//a specific context, such as a callback function or an event handler.
//For example, when we want to add an event listener to a button, 
// we can use a function expression   
//to define the callback function that will be executed when the button is clicked.
//real world example of function expression in JavaScript
//Let's say we have a button on a webpage that, when clicked, should display an alert message. 
//We can use a function expression to define the callback function for the click event listener on the button.
//example code
let button = document.getElementById("myButton");

button.addEventListener("click", function() {
    alert("Button was clicked!");
});

//In this example, we use a function expression to define the callback function that will be executed when the button is clicked. 
//This allows us to keep our code organized and makes it clear that the function 
// is only meant to be used as a callback for the click event on the button.

//fucntion can return another function in JavaScript
//In JavaScript, functions can return other functions, which is a powerful feature that allows for higher-order functions and functional programming techniques. 
//When a function returns another function, the returned function can access the variables and parameters of the outer function, creating a closure. 
//This allows for the creation of functions that can maintain state and be used in a variety of contexts.

//example of a function that returns another function
function outerFunction(x) {
    return function innerFunction(y) {
        return x + y;
    }
}

//real world example of a function that returns another function
//Let's say we want to create a function that generates a greeting message based on a given name. 
//We can use a function that returns another function to achieve this.  
function createGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    }
}

let sayHello = createGreeting("Hello");
console.log(sayHello("Alice")); // Output: "Hello, Alice!"


