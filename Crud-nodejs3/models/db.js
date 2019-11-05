const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/EmployeeDB";

//connect mongoose
mongoose.connect(url,{useNewUrlParser:true}, (err) => {
    if(!err){
        console.log('MongoDB connection Successful');
    }
    else{
        console.log('MongoDB connection failure' + err);
    }
});

//include employee model
require('./employee.model');