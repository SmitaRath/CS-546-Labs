const express = require("express");
const router = express.Router();
const shows = require("../data/shows");

router.get("/", async (req,res) =>{
    try{
        const result = shows.aboutMe();
        res.json(result);
    } catch(error){
        res.status(500).send();
    }
});

module.exports=router;