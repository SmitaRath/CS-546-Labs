const showsRoutes = require("./shows");
const aboutMeRoutes = require("./aboutMe");

const constructorMethod = (app) => {
    app.use("/shows",showsRoutes);
    app.use("/aboutme",aboutMeRoutes);
    app.use("*",(req,res)=>{
        res.status(404).json({error : "Not Found"});
    });
};

module.exports = constructorMethod;