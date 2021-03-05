const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
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
        unique:true,
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


    },
    tokens : [{
        token: {
            type:String,
            required:true

        }
    }]
});

// schema.methods are generally known as "instance of model (document) - methods ". This methods are defined for a particular document like authentication of a particular method (instance of model)
userSchema.methods.generateAuthToken = async function ()
{
    // this refers to that "user" through which this method was called 
    
    const token = jwt.sign({ _id : this._id.toString() }, "thisissignature");
    this.tokens = this.tokens.concat({token})
    await this.save();

    return token;
}



// schema.statics are generally known as "model methods". It is defined for the whole collection or model.
// method declared on userSchema to log in a user
userSchema.statics.findByCredential = async (email,password) => {
    const user = await User.findOne({email});
    // console.log(user);
    if(!user)
    {
        throw new Error('Unable to login');
    }
    const password_matched = await bcrypt.compare(password,user.password);

    if(!password_matched)
    {
        throw Error('Unable to login');
    }

    return user;

}


// creating a middleware which ensure some operations to be done before or after saving changes to db
// .pre is for pre opertaions i.e operation before saving to db
// .post is for post operations i.e operations after saving to db
// PRE MUST BE DEFINED BEFORE INITIALIZING MODEL
userSchema.pre('save', async function(next)
{
    // "this" to refer to this document
    if(this.isModified('password'))
    {
        //this.password hashed using 8 rounds hashing algorithm
        this.password = await bcrypt.hash(this.password,8);      
        console.log(this.password);  
    }
    console.log('just before database operation');
    //next() is to indicate that operations are performed and u can pass control to save or update database
    next();
});


// model can be thought of as a collection of mongodb but with a strict schema
// instance of a model is a document in that collection
const User = mongoose.model("user",userSchema);

module.exports = User;