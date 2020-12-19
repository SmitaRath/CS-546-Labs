const express = require("express");
const router = express.Router();
const data = require("../data");
const books = data.books;
const validate = data.validate;
let { ObjectID } = require('mongodb');
const { formatDateInString } = require("../data/validate");

router.get("/", async(req,res)=>{
    try{
        const bookList = await books.getAllBooks();
        res.json(bookList);
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/", async(req,res)=>{
    let bookReq = req.body;

    if(!bookReq){
        res.status(400).json({ error: 'You must provide data to add a Book' });
        return;
    }

    try{
        validate.validateString(bookReq.title);
    }
    catch(e){
        res.status(400).json({ error: "title : " +  e });
        return;
    }

    try{
        validate.validateObject(bookReq.author,"k","authorFirstName","authorLastName");
    }
    catch(e){
        res.status(400).json({ error: "author : " +  e });
        return;
    }

    try{
        validate.validateArray(bookReq.genre);
    }
    catch(e){
        res.status(400).json({ error: "genre : " +  e });
        return;
    }

    try{
        validate.validateDate(bookReq.datePublished);
    }
    catch(e){
        res.status(400).json({ error: "datePublished - " +  e });
        return;
    }

    try{
        validate.validateString(bookReq.summary);
    }
    catch(e){
        res.status(400).json({ error: "summary : " +  e });
        return;
    }


    try{   
        const newBook = await books.addBook(bookReq.title,bookReq.author,bookReq.genre,bookReq.datePublished,bookReq.summary);
        res.json(newBook);
    }
    catch(e){
        res.status(400).json({error: e});
    }
    
})

router.get("/:id", async(req,res)=>{
    try{
        let parsedId = ObjectID(req.params.id);
        validate.validateString(req.params.id);
        const book = await books.getBookById(req.params.id);
        res.json(book);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error: e.message});
        else res.status(404).json({error: e});
    }
})

router.put("/:id", async(req,res)=>{
    try{
        let parsedId = ObjectID(req.params.id);
        validate.validateString(req.params.id);
        const oldBook = await books.getBookById(req.params.id);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error: e.message});
        else res.status(404).json({error: e});
        return;
    }

    const bookReq = req.body;

    if(!bookReq){
        res.status(400).json({ error: 'You must provide data to update a Book' });
        return;
    }

    try{
        validate.validateString(bookReq.title);
    }
    catch(e){
        res.status(400).json({ error: "title : " +  e });
        return;
    }

    
    try{
        validate.validateObject(bookReq.author,"k","authorFirstName","authorLastName");
    }
    catch(e){
        res.status(400).json({ error: "author : " +  e });
        return;
    }

    try{
        validate.validateArray(bookReq.genre);
    }
    catch(e){
        res.status(400).json({ error: "genre : " +  e });
        return;
    }


    try{
        validate.validateDate(bookReq.datePublished);
    }
    catch(e){
        res.status(400).json({ error: "datePublished - " +  e });
        return;
    }

    try{
        validate.validateString(bookReq.summary);
    }
    catch(e){
        res.status(400).json({ error: "summary : " +  e });
        return;
    }

    try{
        const updatedBook = await books.updateBook(req.params.id,bookReq);
        res.json(updatedBook);
    }
    catch(e){
        res.status(400).json({error:e});

    }
})

router.patch("/:id", async(req,res)=>{
    let oldBook;
    let updatedBookToDB={};
    let count = 0;
    try{
        let parsedId = ObjectID(req.params.id);
        validate.validateString(req.params.id);
        oldBook = await books.getBookById(req.params.id);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error: e.message});
        else res.status(404).json({error: e});
        return;
    }

    const bookReq = req.body;

    if(!bookReq){
        res.status(400).json({ error: 'You must provide data to update a Book' });
        return;
    }

    if(bookReq.title)
    {
        try{
            validate.validateString(bookReq.title);
            if(bookReq.title.trim()!==oldBook.title) updatedBookToDB.title = bookReq.title;

        }
        catch(e){
            res.status(400).json({ error: "title : " +  e });
            return;
        }
    }

    if(bookReq.author)
    {
        try{
            let keyCount = Object.keys(bookReq.author).length;
            validate.validateObject(bookReq.author,"k","authorFirstName","authorLastName",keyCount);
            if(keyCount===2){
                if(bookReq.author.authorFirstName.trim()!==oldBook.author.authorFirstName ||
                    bookReq.author.authorLastName.trim() !==oldBook.author.authorLastName) updatedBookToDB.author = bookReq.author;
            }
            else if(bookReq.author.authorFirstName) {
                if(bookReq.author.authorFirstName.trim() !==oldBook.author.authorFirstName) 
                {
                    updatedBookToDB.author={};
                    updatedBookToDB.author.authorFirstName = bookReq.author.authorFirstName;
                }
            }
            else if (bookReq.author.authorLastName){
                if (bookReq.author.authorLastName.trim() !==oldBook.author.authorLastName) 
                {
                    updatedBookToDB.author={};
                    updatedBookToDB.author.authorLastName = bookReq.author.authorLastName;
                }
            }
            
        }
        catch(e){
            res.status(400).json({ error: "author : " +  e });
            return;
        }
    }

    if(bookReq.genre)
    {
        try{
            validate.validateArray(bookReq.genre);
            bookReq.genre.sort();
            oldBook.genre.sort();
            if(JSON.stringify(bookReq.genre)!==JSON.stringify(oldBook.genre)) {
                for(let regGenre of bookReq.genre){
                    for(let dbGenre of oldBook.genre){
                        if(regGenre.trim()===dbGenre)
                        count++;
                    }
                }
                if(count!==bookReq.genre.length) updatedBookToDB.genre = bookReq.genre;
            }
            
        }
        catch(e){
            res.status(400).json({ error: "genre : " +  e });
            return;
        }
    }

    if(bookReq.datePublished)
    {
        try{
            datePublishedDate=validate.validateDate(bookReq.datePublished);
            formatDate = validate.formatDateInString(datePublishedDate);
            if(formatDate!=oldBook.datePublished) updatedBookToDB.datePublished = bookReq.datePublished;
        }
        catch(e){
            res.status(400).json({ error: "datePublished - " +  e });
            return;
        }
    }

    if(bookReq.summary)
    {
        try{
            validate.validateString(bookReq.summary);
            if(bookReq.summary.trim()!==oldBook.summary) updatedBookToDB.summary = bookReq.summary;
        }
        catch(e){
            res.status(400).json({ error: "summary : " +  e });
            return;
        }
    }

    try{
        if (Object.keys(updatedBookToDB).length === 0) throw `Sent Parameter should be present and different than existing data`;
    
        const updateBook = await books.patchBook(req.params.id,updatedBookToDB);
        res.json(updateBook);
    }
    catch(e){
        res.status(400).json({error:e});
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        validate.validateString(req.params.id);
        let parsedId = ObjectID(req.params.id);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error: e.message});
        else res.status(404).json({error: e});
        return;
    }
    try{
        const deletedBook = await books.deleteBookById(req.params.id);
        res.json(deletedBook);
    }
    catch(e){
        res.status(404).json({error: e});
    }
    
})

module.exports = router;