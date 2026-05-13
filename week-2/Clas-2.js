// Problem Statement: Library Book Management System
// -------------------------------------------------
// Objective : Create a Book class and use it to manage a collection of books in a library.

// Requirements:
//   Create a Book class with the following:

//   Properties:
//       title (string)
//       author (string)
//       pages (number)
//       isAvailable (boolean, default: true)


//   Methods:
//       borrow() - Marks the book as not available
//       returnBook() - Marks the book as available
//       getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
//       isLongBook() - Returns true if pages > 300, false otherwise




//   1. Create at least 5 book objects using the class:
//       Example: "Harry Potter", "1984", "The Hobbit", etc.


//   2. Perform the following operations:

//       i. Display info of all books
//       ii. Borrow 2 books and show their availability status
//       iii. Return 1 book and show updated status
//       iv. Count how many books are "long books" (more than 300 pages)
//       v. List all available books

class book{

    pages;
    author;
    title;
    isAvilable;


    constructor(title,author,pages,isAvilable){
        this.title=title
        this.author=author
        this.pages=pages
        this.isAvilable=isAvilable       
    }

    borrow(){
        return this.isAvilable=false

    }
    returnBook(){
        return this.isAvilable=true
    }
    getInfo(){
        console.log(`book title is ${this.title}\n its author is ${this.author}\n it have ${this.pages}pages`); 
    }
    isLong(){

    }
    
}

let b = new book ("Harry Potter","JK.Rowling",200,false)

b.borrow()

b.returnBook()

b.getInfo()
