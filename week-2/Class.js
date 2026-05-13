//class 
//methods are not part of the object
 
//object literals 

const test = {

    a:10,
    getData:function(){

    }
}

class student{
    name;
    rollno;
    email;

    constructor(name,rollno,email){
        this.name = name
        this.rollno = rollno
        this.email = email
    }
    getData(){
       console.log(`name is ${this.name}`);
    }
    
}
{
let s1 = new student('surya','345678','werfgg')
let s2 = new student('prabs','3r432','sdfghj')
console.log(s1);
console.log(s2);
console.log(s1.getData());
}



// //is - a relationship

// class person{}
// class student extends person{}

// //has - relationship
// //composition
// class engine{}
// class car{}

//in javascript and express basically in mern we functional programming and we apply inheritence via has - a 
//relationship instead of using is - a realtionship



//optional chaining


const person={
    name:"surya",
    age:19
}

console.log(person.name);

console.log(person.address)




let orginal = {
    a:10,
    b:30
}

let copy = {...orginal}

orginal.a = 123

console.log(orginal);
console.log(copy);


let order = {
    orderId: "ORD1001",
     customer: {
         name: "Anita",
         address: {
         city: "Hyderabad",
         pincode: 500085
         }
      },
 items: [{ product: "Laptop", price: 70000 }]
 };


//shallow copy demonstartaion
let copyorder = {...order}
console.log(order);

copyorder.items.product="phone"
//in shallow copy if there is nested object the copy object shares same meoery refercne of original object 
//so therefore we need to use strtcuredclone to create entirely 
//diffrent object without refrecning nested objects of the object
console.log(copyorder);
console.log(order);