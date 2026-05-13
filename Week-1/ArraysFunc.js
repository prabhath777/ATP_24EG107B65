let person1 = {
    name: "prabs",
    last: "lolo",
    age: 23,
    city: "bangalore",
    marks: [78,23],
    greet: function() {
        console.log(`Hello, my name is ${this.name} ${this.last} and I am ${this.age} years old and I live in ${this.city}`);
    },
    arrayfunc: function(){
         this.marks.push(10,80)
        this.marks.unshift(100)
        ass = this.marks.splice(3,1,10000)
        this.marks.splice(3,2,10000)
        we = this.marks.shift()
        qw = this.marks.pop()
         this.marks.push(19)
    },
    marrks: function(){
        //this.marks.push(10,80)
        //this.marks.unshift(100)
        //ass = this.marks.splice(3,1,10000)
        //this.marks.splice(3,2,10000)
        //we = this.marks.shift()
        //qw = this.marks.pop()
         //this.marks.push(19)
        
        totall = 0;
        for(let mark of this.marks){
            
            totall += mark
        }
        avg = totall/this.marks.length
        console.log(totall)
        console.log(avg)
    }
}
console.log(person1.greet())
console.log(person1.marrks())
console.log(person1.arrayfunc())
console.log(person1.marks)
console.log(we)
console.log(qw)
console.log(ass)