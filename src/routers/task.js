const express = require('express');
const Task = require("../models/task.js");
const router = express.Router();


router.post("/task",async (request,response)=>{
    const task = Task(request.body);
    try{
    const result = await task.save();
    response.status(201).send(result);
    }
    catch(error)
    {
        response.status(400).send(error);
    }
   
});

router.get("/tasks",async (request,response)=>{
    try{
    const task = await Task.find({})
    response.send(task);
    }
    catch(error)
    {
        response.send(error);
    }
});

router.get("/tasks/:id",async (request,response)=>{
    const id = request.params.id;
    try{
        const task = await Task.findById(id);
        if(!task)   
        {
            response.status(400).send();
        }
        response.status(201).send(task);
    }
    catch(error)
    {
        response.status(500).send(error);
    }
    
});

router.patch("/tasks/:id",async (request,response) => {
    const id = request.params.id;
    try{
        const tasks = await Task.findByIdAndUpdate(id,request.body,{ new:true,runValidators:true });
        console.log(tasks);
        if(!tasks)
        {
            response.status(404).send();
        }
        response.status(201).send(tasks);

    }   
    catch(error)
    {
        response.status(500).send(error);

    }
});


router.delete("/tasks/:id",async (request,response) => {
    const id = request.params.id;
    try{
        const tasks = await Task.findByIdAndDelete(id);
        console.log(tasks);
        if(!tasks)
        {
            response.status(404).send();
        }
        response.status(201).send(tasks);

    }   
    catch(error)
    {
        response.status(500).send(error);

    }
});

module.exports = router;