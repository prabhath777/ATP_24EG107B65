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


