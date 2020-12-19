const express = require("express");
const router = express.Router();
const data = require("../data");
const reviews = data.reviews;
const validate = data.validate;
const books = data.books;
let { ObjectID } = require('mongodb');

router.get("/:bookId" , async(req,res)=>{
    try{
        validate.validateString(req.params.bookId);
        let parsedId = ObjectID(req.params.bookId);
        const bookById = await books.getBookById(req.params.bookId);
        const reviewsList = await reviews.getReviewsForBookID(req.params.bookId);
        if(reviewsList.length===0){
            res.status(404).json({error : `Reviews are not avaiable for book ${req.params.bookId}`});
            return;
        }

        res.json(reviewsList);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error: e.message});
        else res.status(404).json({error: e});
    }
})

router.post("/:id", async(req,res)=>{
    const reviewFromReq = req.body;

    try{
        validate.validateString(req.params.id);
        let parsedId = ObjectID(req.params.id);
    }
    catch(e){
        if (e.message != null)  res.status(400).json({error: e.message});
        else res.status(400).json({error: e});
        return;
    }
    
    try{
        const bookReview = await books.getBookById(req.params.id);
    }
    catch(e){
        res.status(400).json({ error: e });
        return;
    }

    if(!reviewFromReq){
        res.status(400).json({ error: 'You must provide data to add a Review' });
        return;
    }

    if(req.params.id !== reviewFromReq.bookBeingReviewed){
        let errorMsg = `bookBeingReviewed ${reviewFromReq.bookBeingReviewed} and sent id ${req.params.id} are not same`;
        res.status(400).json({ error: errorMsg });
        return;  
    }

    try{
        validate.validateString(reviewFromReq.title);
    }
    catch(e){
        res.status(400).json({ error: "title : " +  e });
        return;
    }

    try{
        validate.validateString(reviewFromReq.reviewer);
    }
    catch(e){
        res.status(400).json({ error: "reviewer : " +  e });
        return;
    }

    try{
        validate.validateNumber(reviewFromReq.rating);
    }
    catch(e){
        res.status(400).json({ error: "rating : " +  e });
        return;
    }

    try{
        validate.validateDate(reviewFromReq.dateOfReview);
    }
    catch(e){
        res.status(400).json({ error: "dateOfReview - " +  e });
        return;
    }

    

    try{
        validate.validateString(reviewFromReq.review);
    }
    catch(e){
        res.status(400).json({ error: "review : " +  e });
        return;
    }

    try{
        const newReview = await reviews.addReview(reviewFromReq.title,reviewFromReq.reviewer,reviewFromReq.bookBeingReviewed,
            reviewFromReq.rating,reviewFromReq.dateOfReview,reviewFromReq.review);
        res.json(newReview);
    }
    catch(e){
        res.status(400).json({error: e});
    }
})

router.get("/:bookId/:reviewId", async(req,res)=>{
    const reviewId = req.params.reviewId;
    const bookId = req.params.bookId;
    try{
        validate.validateString(reviewId);
        let parsedId = ObjectID(reviewId);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error:"reviewId " + e.message});
        else res.status(404).json({error: e});
        return;
    }
    try{
        validate.validateString(bookId);
        let parsedId = ObjectID(bookId);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error:"bookId " + e.message});
        else res.status(404).json({error: e});
        return;
    }

    try{
        const review = await reviews.getReviewById(reviewId);
        if(review.bookBeingReviewed === bookId){
            res.json(review);
        }
        else{
            let errorMsg = `Review Id ${reviewId} is not associated with  Book ID ${bookId}`;
            res.status(404).json({error : errorMsg});
        }
    }
    catch(e){
        res.status(404).json({error : e});
    }
})

router.delete("/:bookId/:reviewId", async(req,res)=>{
    const reviewId = req.params.reviewId;
    const bookId = req.params.bookId;
    try{
        validate.validateString(reviewId);
        let parsedId = ObjectID(reviewId);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error:"reviewId " + e.message});
        else res.status(404).json({error: e});
        return;
    }
    try{
        validate.validateString(bookId);
        let parsedId = ObjectID(bookId);
    }
    catch(e){
        if (e.message != null)  res.status(404).json({error:"bookId " + e.message});
        else res.status(404).json({error: e});
        return;
    }

    try{
        const review = await reviews.deleteReview(reviewId,bookId);
        res.json(review);
    }
    catch(e){
        res.status(404).json({error : e});
    }
})

module.exports = router;