const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;
const reviews = mongoCollections.reviews;
const validate = require("./validate");
let { ObjectID } = require('mongodb');

async function getAllBooks(){
    const bookCollection = await books();
    const bookList = await bookCollection.find({},{projection:{_id:1,title:1}}).toArray();

    let modifiedAllBooks = bookList.map((arr)=> {
        arr._id=arr._id.toString();
        return arr;
    })

    return modifiedAllBooks;
}

async function getBookById(id){
    try{
        validate.validateString(id);
        let parsedId = ObjectID(id);
        const bookCollection = await books();
        const book = await bookCollection.findOne({_id : parsedId});
        if (book == null) throw `Book is not available with ${id}`;
        book._id=book._id.toString();
        book.datePublished = validate.formatDateInString(book.datePublished);
        return book;
    }
    catch(error){
        if (error.message != null) console.log(error.message);
        else console.log(error);
        throw  `Book is not available with ${id}`; 

    }
    
}

async function addBook(title,author,genre,datePublished,summary){
    try{
        validate.validateString(title);
        validate.validateObject(author,"k","authorFirstName","authorLastName");
        validate.validateArray(genre);
        let datePublishedDate=validate.validateDate(datePublished);
        validate.validateString(summary);
    
        let modifiedGenre = genre.map((obj)=>{
            obj=obj.trim();
            return obj;
        })
    
        author["authorFirstName"]=author["authorFirstName"].trim();
        author["authorLastName"]=author["authorLastName"].trim();

    
        const newBook = {
            title: title.trim(),
            author: author,
            genre: modifiedGenre,
            datePublished: datePublishedDate,
            summary: summary.trim(),
            reviews :[]
        }
        const bookCollection = await books();
        const insertedInfo = await bookCollection.insertOne(newBook);
        if(insertedInfo.insertedCount===0) throw `New Book cannot be added`;
    
        const addedNewBook = await getBookById(insertedInfo.insertedId.toString());
        return addedNewBook;
    }
    catch(error){
        if (error.message != null) console.log(error.message);
        else console.log(error);
        throw `New Book cannot be added`;
    }
    
     
}

async function updateBook(id,updatedBook){
    let updateBookToDB = {};
    let datePublishedDate;
    const existingBook = await getBookById(id);
    try{
        if(updatedBook.title){
            validate.validateString(updatedBook.title)
            updateBookToDB.title = updatedBook.title.trim();
        }

        if(updatedBook.author){
            validate.validateObject(updatedBook.author,"k","authorFirstName","authorLastName");
            updateBookToDB.author = updatedBook.author;
            updateBookToDB.author["authorFirstName"]=updateBookToDB.author["authorFirstName"].trim();
            updateBookToDB.author["authorLastName"]=updateBookToDB.author["authorLastName"].trim();
        }


        if(updatedBook.genre){
            validate.validateArray(updatedBook.genre)
            let modifiedGenre = updatedBook.genre.map((obj)=>{
                obj=obj.trim();
                return obj;
            })
            updateBookToDB.genre = modifiedGenre;
        }

        if(updatedBook.datePublished){
            datePublishedDate = validate.validateDate(updatedBook.datePublished);
            updateBookToDB.datePublished =datePublishedDate;
        } 

        if(updatedBook.summary){
            validate.validateString(updatedBook.summary)
            updateBookToDB.summary = updatedBook.summary.trim();
        }

        let parsedId = ObjectID(id);
        const bookCollection = await books();
        const updatedInfo = await bookCollection.updateOne({_id : parsedId},{$set :updateBookToDB });

        let returnResult = await getBookById(id);
        returnResult._id = returnResult._id.toString();
        return returnResult;       

    }
    catch(error){
        if (error.message != null) console.log(error.message);
        else console.log(error);
        throw `Update operation is not successful`;
    }
}

async function patchBook(id,updatedBook){
    let updateBookToDB = {};
    let modifiedGenre=[];
    let datePublishedDate;
    let parsedId = ObjectID(id);
    const existingBook = await getBookById(id);
    const bookCollection = await books();
    try{
        if(updatedBook.title){
            validate.validateString(updatedBook.title)
            updateBookToDB.title = updatedBook.title.trim();
        }

        if(updatedBook.author){
            let keyCount = Object.keys(updatedBook.author).length;
            validate.validateObject(updatedBook.author,"k","authorFirstName","authorLastName",keyCount);
            if(keyCount===2){
                updateBookToDB.author = updatedBook.author;
                updateBookToDB.author["authorFirstName"]=updateBookToDB.author["authorFirstName"].trim();
                updateBookToDB.author["authorLastName"]=updateBookToDB.author["authorLastName"].trim();
            }
            else if(updatedBook.author.authorFirstName){
                existingBook.author.authorFirstName = updatedBook.author.authorFirstName.trim();
                updateBookToDB.author = existingBook.author;
            }
            else if(updatedBook.author.authorLastName){
                existingBook.author.authorLastName = updatedBook.author.authorLastName.trim();
                updateBookToDB.author = existingBook.author;
            }
            
        }


        if(updatedBook.genre){
            validate.validateArray(updatedBook.genre)
            modifiedGenre = updatedBook.genre.map((obj)=>{
                obj=obj.trim();
                return obj;
            })
           for(let arr of modifiedGenre)
            {
                const updatedGenre = await bookCollection.updateOne({_id : parsedId}, { $addToSet : {genre : arr} });
            }
        }

        if(updatedBook.datePublished){
            datePublishedDate= validate.validateDate(updatedBook.datePublished)
            updateBookToDB.datePublished = datePublishedDate;
        } 

        if(updatedBook.summary){
            validate.validateString(updatedBook.summary)
            updateBookToDB.summary = updatedBook.summary.trim();
        }
  
        if(Object.keys(updateBookToDB).length !== 0)
        {
            const updatedInfo = await bookCollection.updateOne({_id : parsedId},{$set :updateBookToDB });
        }
        
        let returnResult = await getBookById(id);
        returnResult._id = returnResult._id.toString();
        return returnResult;       

    }
    catch(error){
        if (error.message != null) console.log(error.message);
        else console.log(error);
        throw `Update operation is not successful`;
    }
}



async function deleteBookById(id){

    validate.validateString(id);
    let parsedId = ObjectID(id);
    const existingBook = await getBookById(id);
    const bookCollection = await books();
    const reviewCollection = await reviews();
    const deleteInfo = await bookCollection.deleteOne({_id:parsedId});
    if (deleteInfo.deletedCount === 0) throw `Could not delete book with Id ${id}`;
    const deleteReviewInfo = await reviewCollection.deleteMany({bookBeingReviewed:id});
    return {bookId:id,deleted : true};
} 


module.exports ={
    getAllBooks,
    addBook,
    getBookById,
    updateBook,
    patchBook,
    deleteBookById
}