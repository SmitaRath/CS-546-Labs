const userRoutes = require('./users');

const constructorMethod = (app) => {
  
app.use('/', userRoutes);
app.use('*', (req, res) => {
    res.status(404);
    res.render("users/message",{title:"Error",heading:"Error",message:"Page not Found"});
  });
};

module.exports = constructorMethod;