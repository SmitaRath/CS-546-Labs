const express = require('express');
const exphbs = require('express-handlebars');
const configRoutes = require('./routes');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const static = express.static(__dirname + '/public');
app.use('/public',static);
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);
app.listen(3000,()=>{
    console.log("We've got a server now");
    console.log("Your routes will be running on http://localhost:3000");
});


