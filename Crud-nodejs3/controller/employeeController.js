const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');

//include the model class
const Employee = mongoose.model('Employee');

router.get('/', (req,res) => {
    res.render('Employee/addOrEdit.hbs',{
        viewTitle:'Insert Employee'
    })
});

//handle the post request
router.post('/', (req,res) => {

//check for create or update of the records
if(req.body._id ==""){
    insertRecord(req,res);
}  else{
    updateRecord(req,res);
}

});

function insertRecord(req,res) {
   var employee = new Employee();

   employee.fullName = req.body.fullName;
   employee.email = req.body.email;
   employee.mobile = req.body.mobile;
   employee.city = req.body.city;

   //custom validation
   if(employee.fullName == "" || employee.email == "" || employee.mobile == "" || employee.city == "")
   {
       res.render('Employee/addOrEdit',({
           viewTitle:'Insert Employee',
           error:'Enter all the details',
           employee:req.body
       }));
       return;
   }

   employee.save((err,docs) => {
       if(!err) {
           res.redirect('employee/list');
       }
       else {
           if(err.name == "ValidationError")
           {
               handleValidationError(err,req.body);
               res.render('Employee/addOrEdit',({
                   viewTitle:'Insert Employee',
                   employee:req.body
               }))
           }
           console.log("error in inserting the Records" + err);
       }
   })
}

//create router to display list of employees

router.get('/list', (req,res) => {
    Employee.find((err,docs) => {
        if(!err){
            res.render('Employee/list', {
                list:docs
            })
        }
    })
});

//update router
router.get('/:id',(req,res) => {
    Employee.findById(req.params.id,(err,doc) => {
        if(!err){
            res.render('Employee/addOrEdit',({
                viewTitle:'Update Employee',
                employee:doc
            }))
        }
    })
})

//update record
function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc) => {
        if(!err){
            res.redirect('Employee/list');
        }
        else{
            if(err.name == "ValidationError")
            {
                handleValidationError(err,req.body);
                res.render('Employee/addOrEdit',({
                    viewTitle:'updateEmployee',
                    employee:req.body
                }));
            }
            else{
                console.log("error in updating the records" + err);
            }
        }
    })
}

//delete
router.get('/delete/:id',(req,res) => {
    Employee.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log("Error in deleting the record" + err);
        }
    })
})

//Validation case
function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path)
        {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;

        }
    }
}
module.exports = router;