const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/task-manager-api",{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true}).then((resolved)=>{
    console.log("Database Connected");
}).catch((rejected)=>{
    console.log("Database connection unsuccessful");
});