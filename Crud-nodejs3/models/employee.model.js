//fullName //email //mobile //city
//schema

const mongoose = require('mongoose');
const validator = require('email-validator');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    email: {
        type:String
    },
    mobile: {
        type:String
    },
    city: {
        type:String
    }
});

employeeSchema.path('email').validate((val) => {
    return validator.validate(val);
},"Invalid Email");

mongoose.model('Employee',employeeSchema);