const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username; 
  const password = req.body.password; 
  const isusernameexist = false; 
  // check if the username exist in the array of users
  for(const id in users)
  {
    if(username == users[id].username || username || password)
      return isusernameexist; 
    else
       isusernameexist = true; 
  }

  // register the new user and password
  if(isusernameexist)
  {
    const userRegistered = {"username": username, "password": password}
    users.push(userRegistered); 
    return res.status(300).json({message: "User is successfully registered"});
  }


});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message:JSON.stringify(books) });
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
        return res.status(300).json({message: JSON.stringify(book)});
    }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title_param = req.params.title; 
  for(const isb_no in books)
    {
      const book = books[isb_no]; 
      if(book.title == title_param)
        return res.status(300).json({message: JSON.stringify(book)});
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

const availablebooks = new Promise((resolve, reject) =>{
  if(books)
{
  resolve(JSON.stringify(books)); 
}
else
 reject("No more books in the store"); 

}); 

availablebooks.then((result) =>{return result}).catch((error) => {return error}); 

const basedonISBNbookdetails = new Promise((resolve, reject) =>{

  if(isbn-number == isbn)
     resolve(book[isbn-number])
  else
     reject("There is no book under this isbn number"); 
  
  }); 
  basedonISBNbookdetails.then((result) =>{return result}).catch((error) => {return error});


  const basedAuthorbookdetails = new Promise((resolve, reject) =>{
    for(const isb_no in books)
      {
        const book = books[isb_no]; 
        if(book.author == author_param)
          return resolve({message: JSON.stringify(book)});
        else
          return reject("There is no book under this author"); 
      }
    
    }); 
   

    const basedtitlebookdetails = new Promise((resolve, reject) =>{
      for(const isb_no in books)
        {
          const book = books[isb_no]; 
          if(book.title == author_param)
            return resolve({message: JSON.stringify(book)});
          else
            return reject("There is no book under this title"); 
        }
      
      }); 
     