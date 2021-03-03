const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://localhost:27017/task-manager-api',{useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology:true})
.then(()=>{console.log("Database Connected");});

const Task = mongoose.model("task",{
    description : {
        type : String,
        required : true,
        trim : true  
    },
    completed :{
        type : Boolean,
        required : false,
        default : false
    }    
});

const User = mongoose.model("user",{
    name : {
        type : String,
        required : true,
        trim : true
    },
    age :{
        type : Number,
        required : true,
        // this is custom validation provided by mongoose
        validate (value)
        {
            if(value < 0 )
            {
                throw Error("Age can't be a negative number");
            }
        }
    },
    email :{
        type : String,
        required : true,
        lowercase : true, // coverts to lower case
        validate (value)
        {       
                // validation from npm validator library
                if(!validator.isEmail(value))
                {
                    throw Error("Not a valid email address");
                }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        trim : true,
        validate (value)
        {
            if(validator.contains(value,"password"))
            {
                throw Error("Password should not contain 'password' ");
            }
        }


    }
});

const task = Task({
    description : "Task 3",
    completed : false
})

//task.save().then((resolved) => {console.log(resolved);}).catch((rejected)=>{console.log(rejected);});

const user = User({
    name : "Meet Patel",
    age : 16,
    email : "meet.patel@gmail.com",
    password : "pass_word"
});

//user.save().then((resolved) => {console.log(resolved);}).catch((rejected)=>{console.log(rejected);});
