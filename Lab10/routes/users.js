const users = require("../data/users");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    if(!req.session.AuthCookie)
    res.render("users/login",{title:"Login",heading:"Login"});
    else
    res.redirect("/private");
});

router.post("/login", async(req,res)=>{
    let userObject = users.find( obj => {
        return obj.username === req.body.username;
    });
    let loginResult;
    if (userObject){
        loginResult = await bcrypt.compare(req.body.password,userObject.hashedPassword);
        if(loginResult)
        {
            req.session.AuthCookie=req.body.username;
            req.session.user={ firstName: userObject.firstName, lastName: userObject.lastName, userId: userObject._id };
            res.redirect("/private");
        }
        else
        {
            res.status(401);
            res.render("users/login",{error:"Invalid Password",title:"Login",heading:"Login"});
        }
    }
    else{
        res.status(401);
        res.render("users/login",{error:"Invalid Username",title:"Login",heading:"Login"});
    }
});

router.get("/private",(req,res)=>{
    let userObject = users.find( obj => {
        return obj._id === req.session.user.userId;
    });
    objectDetails={
        user:userObject,
        title:"User Details",
        heading:"User Details"
    }
    res.render("users/user",objectDetails);
});

router.get("/logout",(req,res)=>{
    if(!req.session.AuthCookie)
    res.redirect("/");
    else{
    req.session.destroy();
    res.render("users/logout",{title:"Logout",heading:"Logout",message:"User has been successfully logged out",msg:true});
    }
});

module.exports = router;


