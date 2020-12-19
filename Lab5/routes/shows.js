const express = require("express");
const router = express.Router();
const shows = require("../data/shows");

router.get("/",async(req,res) => {
    try{
        const showsList = await shows.getShows();
        res.json(showsList);
    }catch(error){
        res.status(500).send();
    }
});

router.get("/:id",async(req,res) => {
    try{
        const show = await shows.getShowById(req.params.id);
        res.json(show);
    }
    catch(error){
        let errorMessage = `${req.params.id} not found`;
        res.status(404).json({message: errorMessage});
        console.log(error);
    }
});

module.exports=router;