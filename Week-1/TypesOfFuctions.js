message = (_name) => {
    return function greeting(name){
        return `Hello ${name}`;
    
}}
 greet = message("prabs");
console.log(greet("prabs"))

//another exmaple of function returning a function which is real life example of closure in JavaScript of a sceario where we have a function that takes a parameter and returns another function that uses that parameter to perform some operation.

function multiplier(factor) {
    return function(number) {
        return number * factor;
    }
}

let double = multiplier(2);
let triple = multiplier(3);


// In React, the concept of functions returning functions is often used in
// higher-order components (HOCs) and custom hooks. Here's an example of a custom hook that uses this concept:

import { useState } from 'react';
function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return [count, increment, decrement];
}   

function creategame(name){
    return function level(){
        return `welcome ${name} to the game and you are at level ${levelnumber}`;
    }
}


let levelnumber = 1;
let game = creategame("prabs");
console.log(game())



//fucntion that takes a parameter and returns another function that uses that parameter to perform some operation.

function power(exponent) {
    return function(base) {
        return Math.pow(base, exponent);
    }   }

let square = power(2);
let cube = power(3);
console.log(square(5)); // Output: 25
console.log(cube(5));   // Output: 125  


function payementmode(mode){
    return function(upiid){
        return `you have selected ${mode} as your payment mode and your upiid is ${upiid}`;
    }       
}

let pay = payementmode("googlepay");
console.log(pay("prabs@okaxis"))




let makepaymet = (amount,mode) => {
    console.log(`you have made a payment of ${amount} using ${mode}`);
    makepayment();
}
let upipayment = (amount) => {
    console.log(`you have made a payment of ${amount} using upi`);
}
let cardpayment = (amount) => {
    console.log(`you have made a payment of ${amount} using card`);
}
let cashpayment = (amount) => {
    console.log(`you have made a payment of ${amount} using cash`);
}

makepaymet(2020200202,cardpayment)
