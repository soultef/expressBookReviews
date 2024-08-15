const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username; 
  const password = req.body.password; 
  let isUsernameExist = false; 
  
  // Check if username exists in the array of users
  for (const user of users) {
    if (username === user.username) {
      isUsernameExist = true;
      break;
    }
  }

  // Register the new user if username does not exist
  if (isUsernameExist) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Validate that username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Register the new user
  const userRegistered = { username, password };
  users.push(userRegistered); 
  return res.status(201).json({ message: 'User is successfully registered' });

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message:JSON.stringify(books, null, 2) });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn_number = req.params.isbn; 
  for(const isb_no in books)
  {
    if(isbn_number == isb_no)
      return res.status(300).json({message:books[isbn_number] });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author_param = req.params.author; 
  for(const isb_no in books)
    {
      const book = books[isb_no]; 
      if(book.author == author_param)
      {
        const stringifyBook = JSON.stringify(book); 
        const bookObj = JSON.parse(stringifyBook); 
        return res.status(300).json({message: bookObj});
      }
        
    }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title_param = req.params.title; 
  for(const isb_no in books)
    {
      const book = books[isb_no]; 
      if(book.title == title_param)
      {
        const stringifyBook = JSON.stringify(book); 
        const bookObj = JSON.parse(stringifyBook); 
        return res.status(300).json({message: bookObj});
      }
       
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn_number = req.params.isbn; 
  for(const isb_no in books)
  {
    const book = books[isb_no]; 
    if(isbn_number == isb_no)
      return res.status(300).json(JSON.stringify(book.reviews));
  }
});

module.exports.general = public_users;

