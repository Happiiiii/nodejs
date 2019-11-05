require('./models/db')
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const employeeController = require('./controller/employeeController');

var app = express();
//configuring the middleware
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json()); //convert all request data into json formate

//configuring the view of an application
app.set('views',path.join(__dirname,'/views/'));

//configuring the engine
app.engine('hbs',expressHandlebars({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname + '/views/layouts'
}));

app.set('view engine', 'hbs'); //successfully configured express-handlebars

//configuring the route
app.get('/',(req,res) => {
    res.send("HelloWorld...!");
})
//port setup
app.listen(5000, () => {
    console.log("server is listening to the port 5000");
});

app.use('/employee',employeeController);