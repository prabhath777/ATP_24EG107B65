//json and xml are language neutral data formats which is used for communication between apis


//json is a subset of javascript and it is used for communication between apis
//json stands for javascript object notation and it is a lightweight data i
//nterchange format that is easy for humans to read and write and easy 
// for machines to parse and generate

//json example
// {
//     "name":"surya",
//     "age":19,
//     "city":"chennai"
// }
//json is used for communication between apis because it is easy to parse
//  and generate and it is language neutral

//xml is a markup language that is used for communication between apis 
// and it is more verbose than json and it is not as easy to parse and generate as json


//xml example
// <person>
//     <name>surya</name>
//     <age>19</age>
//     <city>chennai</city>
// </person>

//yaml is a human friendly data serialization format that 
//is used for communication between apis and it is more readable than json and xml
//yaml example
// name: surya
// age: 19
// city: chennai

fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));