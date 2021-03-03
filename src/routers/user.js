const express = require('express');
const User = require("../models/user.js");
const router = express.Router();


// To insert user
router.post("/user", async (request,response)=>{
    // console.log(request.body);
    // response.end(); 

    // name , age, email, password
    const user =  User(request.body);
    try{
       const result = await user.save();
       response.status(201).send(result); 
    }
    catch(error)
    {
        response.status(400).send(error);
    }
    
});

// To display all users
router.get("/users",async (request,response)=>{
    try{
    const users = await User.find({});
    response.send(users);
    }
    catch(error)
    {
        response.send(error);
    }
    
    //({}).then((resolved)=>{response.send(resolved);}).catch((rejected)=>{response.send(rejecetd)});
});

// To display user particular user
router.get("/users/:id",async (request,response)=>{
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
    
    
});
//To update a particular user
router.patch("/users/:id", async (request,response) => {
    
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
    
    const id = request.params.id;
    try{
    
        const user = await User.findByIdAndUpdate(id, request.body, {new:true, runValidators:true})
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

});

// To delete a user
router.delete("/users/:id",async (request,response) => {
    const id = request.params.id;
    try{
        const users = await User.findByIdAndDelete(id);
        console.log(users);
        if(!users)
        {
            response.status(404).send();
        }
        response.status(201).send(users);

    }   
    catch(error)
    {
        response.status(500).send(error);

    }
});


module.exports = router;