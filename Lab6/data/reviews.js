const mongoCollections = require("../config/mongoCollections");
const books = require("./books");
const reviews = mongoCollections.reviews;
const booksColl = mongoCollections.books;
const validate = require("./validate");
let { ObjectID } = require('mongodb');

async function getReviewsForBookID(id){
    try{
        validate.validateString(id);
        const bookById = books.getBookById(id);
        let reviewCollection = await reviews();
        const reviewsList = await reviewCollection.find({bookBeingReviewed : id}).toArray();

        let modifiedReviewsList = reviewsList.map((arr)=> {
            arr._id=arr._id.toString();
            arr.dateOfReview = validate.formatDateInString(arr.dateOfReview);
            return arr;
        })
        return modifiedReviewsList;
    }
    catch(error){
        if (error.message != null) console.log(error.message);
        else console.log(error);
        throw `Book is not available with ${id}`;
    }
}

async function getReviewById(id){
    try{
        validate.validateString(id);
        let parsedId = ObjectID(id);
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne({_id : parsedId});
        if (review == null) throw `Review is not available with ${id}`;
        review._id=review._id.toString();
        review.dateOfReview = validate.formatDateInString(review.dateOfReview);
        return review;
    }
    catch(error){
        if (error.message != null) console.log(error.message);
        else console.log(error);
        throw  `Review is not available with ${id}`; 

    }
    
}

async function addReview(title,reviewer,bookBeingReviewed,rating,dateOfReview,review){
    let dateOfReviewDate;
    try{
        
        validate.validateString(title);
        validate.validateString(reviewer);
        validate.validateString(bookBeingReviewed);
        validate.validateNumber(rating);
        dateOfReviewDate=validate.validateDate(dateOfReview);
        validate.validateString(review);
        const bookById = books.getBookById(bookBeingReviewed);
        const newReview = {
            title:title.trim(),
            reviewer :reviewer.trim(),
            bookBeingReviewed:bookBeingReviewed,
            rating:rating,
            dateOfReview:dateOfReviewDate,
            review:review.trim()
        }
        const reviewCollection = await reviews();
        const insertedInfo = await reviewCollection.insertOne(newReview);
        if (insertedInfo.insertedCount===0) throw `New Review cannot be added`;
        const bookCollection = await booksColl();
        const updateBooks = await bookCollection.updateOne({_id:ObjectID(bookBeingReviewed)},{$addToSet :{reviews:insertedInfo.insertedId.toString()}});
        const newAddedReview = await getReviewById(insertedInfo.insertedId.toString());
        newAddedReview._id = newAddedReview._id.toString();
        return newAddedReview;
    }
    catch(e){
        if (error.message != null) console.log(e.message);
        else console.log(e);
        throw  `New Review cannot be added`; 
    }
    
}

async function deleteReview(reviewId,bookId){
        validate.validateString(reviewId);
        validate.validateString(bookId);
        let parsedReviewId = ObjectID(reviewId);
        let parsedBookId = ObjectID(bookId);
        const reviewToBeDeleted = await getReviewById(reviewId);
        if(reviewToBeDeleted.bookBeingReviewed !== bookId) throw `Sent Review Id ${reviewId} and Book Id ${bookId} are not associated`;
        const reviewCollection = await reviews();
        const bookCollection = await booksColl();
        const deletedInfo = await reviewCollection.deleteOne({_id:parsedReviewId});
        const updateInfo = await bookCollection.updateOne({_id:parsedBookId},{$pull:{reviews : reviewId}});
        return {reviewId:reviewId,deleted:true};
}

module.exports = {
    getReviewsForBookID,
    addReview,
    getReviewById,
    deleteReview
}