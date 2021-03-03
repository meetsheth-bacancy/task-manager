const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = User;