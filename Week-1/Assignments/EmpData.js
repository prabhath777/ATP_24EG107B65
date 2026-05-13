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





//1
//employees.splice(2,0,{  
  //  eno: 108,
    //name: "Anil",
    //marks: [80, 85, 87],
 // },)
for(let i of employees){
 if(employees[i].name ==="kiran"){
  Pop(i)
 }}
console.log(employees)


//2
employees.splice(4,1)
//employees.name['kiran'].pop()
console.log(employees)


//3
employees[3].marks.splice(2,1,3343)
console.log(employees)