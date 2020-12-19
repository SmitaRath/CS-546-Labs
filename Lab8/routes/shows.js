const { KeyObject } = require("crypto");
const express = require("express");
const router = express.Router();
const data = require("../data/shows");

router.get("/", async(req,res)=>{
    res.render("shows/search",{title:"Show Finder"});
});

router.post("/search", async(req,res)=>{
    const keyword = req.body;

    if(!keyword.searchTerm.trim()){
        res.status(400);
        errorDesc = {
            className : "error",
            message : "Error 400 - Enter the keyword to search",
            title :   "Error"
        }
        res.render("shows/error",errorDesc);
        return;
    }
    
    try{
        const shows = await data.getShows(keyword.searchTerm);


    if(shows.length===0){
        errorDesc = {
            className : "not-found",
            message : `We're sorry, but no results were found for ${keyword.searchTerm}.`,
            hasErrors :   "Error",
            title : "Show Finder"
        }
        res.render("shows/search",errorDesc);
        return;
    }
    const showsList = {
        title:"Shows Found",
        allShows : shows,
        searchTerm : keyword.searchTerm
    }
    res.render("shows/multipleShows" ,showsList);

}
catch(e){
    errorDesc = {
        className : "not-found",
        message : `We're sorry, but no results were found for ${keyword.searchTerm}.`,
        hasErrors :   "Error"
    }
    res.render("shows/search",errorDesc);
    return;
}
    
});

router.get("/shows/:id", async(req,res)=>{
    try{
        const showById = await data.getShowById(req.params.id);   

        if(showById==null){
            res.status(404);
            errorDesc = {
                className : "error",
                message : `Error 404 : No show found for the given id ${req.params.id}`,
                title :   "Error"
            }
            res.render("shows/error",errorDesc);
        }    
        if(showById.summary)
        {
             showById.summary=showById.summary.replace(/(&nbsp;|<([^>]+)>)/ig,"");
        }

        const showDetails = {
        title : showById.name,
        shows : showById
        }
        res.render("shows/show",showDetails);

    }
    catch(e){
        res.status(404);
        errorDesc = {
            className : "error",
            message : `Error 404 : No show found for the given id ${req.params.id}`,
            title :   "Error"
        }
        res.render("shows/error",errorDesc);
    }
    
})

module.exports=router;

