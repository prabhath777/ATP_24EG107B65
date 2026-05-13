Client side applicationa nd server side application can intercat witheach other over http protocol by making http requests
and http response to make the http request from the client side application,one can use fetch funtion or axios module 



## the following are the http request types 

# GET - read all resources
# POST - to create resource
# PUT - to update entire resource
# DELETE - to delete resource
# PATCH - to update a resource partially 

The post,put,pathc request types can have the body property which can hold the json data where as **GET** and delete request do not have body property and they can send the data through **URL**


## State managemnt and prop drilling 


State management in React refers to the way we handle and manage the data that changes over time in our application. It allows us to keep track of the current state of our components and update them when necessary.
Prop drilling is a term used to describe the process of passing data from a parent component down to its child components through props. This can become cumbersome and inefficient when we have deeply nested components, as we may need to pass props through multiple levels of the component tree just to get the data to the component that needs it.
To understand state management and prop drilling, let's use an analogy of a family tree. Imagine you have a family tree with multiple generations. The top-level component is the grandparent, and the child components are the parents and children.
In this analogy, the state is like the family history or information that is shared among the family members. The grandparent component holds the state, which could be information about the family, such as names, ages, and relationships. The parent components can access this state and pass it down to their child components through props.
However, if the family tree is very large and has many generations, it can become difficult to manage the state and pass it down through multiple levels of the component tree. This is where state management libraries like Redux or Context API come in handy. They allow us to manage the state in a more centralized way, making it easier to access and update the state from any component without having to pass props through multiple levels.
In real-world scenarios, state management and prop drilling can be seen in various applications. For example, in an e-commerce application, the state could hold information about the user's shopping cart. The parent component (e.g., the shopping cart page) can pass this state down to child components (e.g., individual product components) through props. However, if the application has many nested components, it can become difficult to manage the state and pass it down effectively, which is where state management libraries can help streamline the process.
In summary, state management is crucial for handling data that changes over time in a React application, while prop drilling can become inefficient when dealing with deeply nested components. Using state management libraries can help alleviate the issues associated with prop drilling and make it easier to manage state across the application.
