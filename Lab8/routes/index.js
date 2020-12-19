const showRoutes = require('./shows');

const constructorMethod = (app)=>{
app.use('/',showRoutes);
app.use("*",(req,res)=>{
    
    errorDesc = {
        className : "error",
        message : "Error 404 : Page not found",
        title :   "Error"
    }
    res.status(404).render("shows/error",errorDesc);
}); 
}

module.exports=constructorMethod;