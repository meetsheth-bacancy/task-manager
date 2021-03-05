const Task = require("../models/task.js");

const insertTask = async (request,response)=>{
    const task = Task(request.body);
    try{
    const result = await task.save();
    response.status(201).send(result);
    }
    catch(error)
    {
        response.status(400).send(error);
    }
   
}

const displayAllTask = async (request,response)=>{
    try{
    const task = await Task.find({})
    response.send(task);
    }
    catch(error)
    {
        response.send(error);
    }
}

const displayTaskById = async (request,response)=>{
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
    
}

const updateTask = async (request,response) => {
    
    try{
        const id = request.params.id;
        const requested_updates = Object.keys(request.body);
        const task = await Task.findById(id);
       
        requested_updates.forEach((element) => {
            task[element] = request.body[element]
        });
        await task.save();
        console.log(task);
        // const tasks = await Task.findByIdAndUpdate(id,request.body,{ new:true,runValidators:true });
        // console.log(tasks);
        if(!task)
        {
            response.status(404).send();
        }

        response.status(200).send(task);

    }   
    catch(error)
    {
        response.status(500).send(error);

    }
}

const deleteTask = async (request,response) => {
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
}

module.exports = { insertTask , displayAllTask , displayTaskById , updateTask , deleteTask}
