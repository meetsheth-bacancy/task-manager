const User = require("../models/user.js");


const addNewUser = async (request,response)=>{
    
    // name , age, email, password
    
    try{
        const user = User(request.body);
       const result = await user.save();
       const token = user.generateAuthToken();
       response.status(201).send({result,token}); 
    }
    catch(error)
    {
        response.status(400).send(error);
    }
    
}


const displayAllUser = async (request,response)=>{
    try{
    const users = await User.find({});
    response.send(users);
    }
    catch(error)
    {
        response.send(error);
    }
    
    //({}).then((resolved)=>{response.send(resolved);}).catch((rejected)=>{response.send(rejecetd)});
}

const displayUserById = async (request,response)=>{
    const id = request.params.id;
    
    try{
    const user = await User.findById(id);
        if(!user)   
        {
            response.status(400).send();
        }
        response.status(200).send(user);
    }   
    catch(e)
    {
        response.status(500).send();
    }     
    
    
}


const updateUserById = async (request,response) => {
    
    // Code to validate that user updates only allowed fields.
    // fetches keys from request.body and compares them with allowedUpdates array
    // const requested_updates = Object.keys(request.body);
    // console.log(requested_updates);
    // const allowedUpdates = ['name','email','password','age'];
    // const isValidOperation = requested_updates.every((element) => allowedUpdates.includes(element));

    // if(!isValidOperation)
    // {
    //     return response.send("Please update valid fields");
    // }
    
    try{
        const id = request.params.id;
        // console.log(id);
        const requested_updates = Object.keys(request.body);
        // console.log(requested_updates);
        const user = await User.findById(id);
        // console.log(user);
        
        requested_updates.forEach((element) => {
            user[element] = request.body[element];
        });

        await user.save();
                
        // below method will wont work with middleware
        //const user = await User.findByIdAndUpdate(id, request.body, {new:true, runValidators:true})
        if(!user)
        {
            response.status(400).send();
        }
        response.status(200).send(user);
    } //try
    catch(error)
    {
        response.status(500).send(error);
    }

}

const deleteUserById = async (request,response) => {
    const id = request.params.id;
    try{
        const users = await User.findByIdAndDelete(id);
        console.log(users);
        if(!users)
        {
            return response.status(404).send();
        }
        response.status(201).send(users);

    }   
    catch(error)
    {
        response.status(500).send(error);

    }
}


const userLogin = async (request,response) => {
    try{
        const user = await User.findByCredential(request.body.email,request.body.password)
        //console.log(request.body.email);
        // note :- obeserve that this method is called using 'user' and not 'User'. 
        // It is called using instance of a model and not a model. henc its more like auth for a user and the whole user model.
        
        if(!user)
        {
            response.status(404).send("Unable to login");
        }
        const token = await user.generateAuthToken();
       
        response.status(201).send({user, token});
    }// try
        
    catch(error)
        {
            response.status(500).send(error);
        }
} 

module.exports = { addNewUser , displayAllUser , displayUserById , updateUserById , deleteUserById , userLogin};