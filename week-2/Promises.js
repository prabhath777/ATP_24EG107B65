
//promises
//i'll call you in 5 minutes
//explain promises in javascript



//A promise is an object that represents the eventual completion (or failure) of an
//  asynchronous operation and its resulting value. 
// It allows you to write asynchronous code in a more synchronous and readable manner.

//explain with analogy  
//Imagine you order a pizza. The pizza shop gives you a promise that
//  they will deliver the pizza to your house in 30 minutes. 
// You can do other things while waiting for the pizza, like watching TV or doing homework. 
// When the pizza arrives, the promise is fulfilled, and you can enjoy your meal. 
// If something goes wrong, like the pizza shop runs out of ingredients,
//  the promise is rejected, and you might have to order from another place.

//A promise has three states:
//1. Pending: The initial state, neither fulfilled nor rejected.
//2. Fulfilled: The operation completed successfully, and the promise has a value.
//3. Rejected: The operation failed, and the promise has a reason for the failure.

//Creating a Promise
//You can create a promise using the Promise constructor, which takes a function as an argument. 
//This function receives two parameters: resolve and reject. 
//You call resolve when the operation is successful and reject when it fails.

// const myPromise = new Promise((resolve, reject) => {
//   // Simulating an asynchronous operation
//   setTimeout(() => {
//     const success = false; // Change this to false to simulate a failure
//     if (success) {
//       resolve("Operation completed successfully!");
//     } else {
//       reject("Operation failed.");
//     }
//     }, 2000);
// });

// //Consuming a Promise
// //You can consume a promise using the then and catch methods. 
// //The then method is called when the promise is fulfilled,
// //  and the catch method is called when it is rejected.

// myPromise
//   .then((result) => {
//     console.log(result); // Output: Operation completed successfully!
//     })
//     .catch((error) => {
//     console.error(error); // Output: Operation failed.
//     });

//i'll send money 10000 tommorrow

let nammakam = {
    trust : false
}




const newprom =  new Promise((resolve, reject) => {
    setTimeout(() => {
        const trust = nammakam.trust
        if(trust)
            resolve("money ista neeku")
        else
            reject("money iyya bey neeku")
    }, 2000);
});

newprom
  .then(result => {
      console.log(result);
  })
  .catch(error => {
      console.error(error);
  });