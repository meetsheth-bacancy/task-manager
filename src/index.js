const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/db-connect.js");

const userRoutes = require('./routers/user.js');
const taskRoutes = require('./routers/task.js');


// this automatically parse incoming json to object
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);





app.listen(port,()=>{
    console.log("Server Established");
});