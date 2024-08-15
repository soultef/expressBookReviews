const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username; 
  const password = req.body.password; 
  let isUsernameExist = false; 
  
  // Check if username exists in the array of users
  for (const user of users) {
    if (username === user.username && password === user.password) {
      isUsernameExist = true; 
      return res.status(300).json({message: "You successfully login"});
    }
  }
  if(!isUsernameExist)
    return res.status(404).json({message: "Sorry you must register first"})

 
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
