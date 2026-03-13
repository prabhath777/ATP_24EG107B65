//
const employees = [
  {
    eno: 101,
    name: "Ravi",
    marks: [78, 82, 91],
  },
  {
    eno: 102,
    name: "Bhanu",
    marks: [65, 70, 68],
  },
  {
    eno: 103,
    name: "Sneha",
    marks: [88, 92, 95],
  },
  {
    eno: 104,
    name: "Kiran",
    marks: [55, 60, 58],
  },
  {
    eno: 105,
    name: "Anitha",
    marks: [90, 85, 87],
  },
];






employees.splice(2,0,{  
   eno: 108,
    name: "Anil",
    marks: [80, 85, 87],
 },)
// for(let i of employees){
//  if(employees[i].name ==="kiran"){
//   Pop(i)
//  }}
// console.log(employees)


//2
employees.splice(4,1)
//employees.name['kiran'].pop()
console.log(employees)


//3
employees[3].marks.splice(2,1,3343)
console.log(employees)


console.log("-----------------------------------------------------------------------------------------------------------------------------------");



const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];
//1. Use filter() to get only inStock product
let instock = cart.filter((product)=>product.inStock==true)
console.log(instock)
//2. Use map() to create a new array with:  { name, totalPrice }
let map = cart.map((product)=>product.name+'--'+product.quantity*product.price)
console.log(map)               
//3. Use reduce() to calculate grand total cart value
let total = cart.reduce((acc,product)=>acc+product.price,0)
console.log(total)
//4. Use find() to get details of "Mouse"
let find = cart.find((product)=>product.id == 102)
console.log(find)
//5. Use findIndex() to find the position of "Keyboard"
let index = cart.findIndex((product)=>product.id ==103)
console.log(index)


console.log('--------------------------------------------------------------------------------------')


const students = [
  { id: 1, name: "Ravii", marks: 78 },
  { id: 2, name: "Anjap", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];
//1. filter() students who passed (marks ≥ 40)
let filter = students.filter((stud)=> stud.marks > 40)
console.log(filter)
//2.map() to add a grade field
let grade = students.map((stu)=>{
    if (stu.marks >= 90)
        return 'A'
    else if(stu.marks >= 75)
        return 'B'
    else if(stu.marks >= 60)
        return 'C'
    else
        return 'D'
})
console.log(grade)
//3. reduce() to calculate average marks
let average = students.reduce((a,b)=>a+b.marks/students.length,0)
console.log(average)
//4.find marks 92
let pos = students.find((stu)=>stu.marks == 92)
console.log(pos)
//5.find index kiran
let poss = students.findIndex((stu)=>stu.name == 'Kiran')
console.log(poss)


console.log("-----------------------------------------------------------------------------------------------------------------------------------");



let employeees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

// 1. filter() employees from IT department
let it = employeees.filter(function(e) {
  return e.department === "IT";
});
console.log(it);

// 2. map() to add netSalary = salary + 10% bonus
let bonus = employeees.map(function(e) {
  return {
    id: e.id,
    name: e.name,
    salary: e.salary,
    department: e.department,
    netSalary: e.salary + (e.salary * 0.10)
  };
});
console.log(bonus);

// 3. reduce() to calculate total salary payout
let totalll = employeees.reduce(function(sum, e) {
  return sum + e.salary;
}, 0);
console.log(totalll);

// 4. find() employee with salary 30000
let emp30000 = employeees.find(function(e) {
  return e.salary === 30000;
});
console.log(emp30000);

// 5. findIndex() of employee "Neha"
let Neha = employeees.findIndex(function(e) {
  return e.name === "Neha";
});
console.log(Neha);