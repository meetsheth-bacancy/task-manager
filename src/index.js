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

// const bcrytp = require("bcryptjs");

// const fun1 = async () => {
// const hashedPwd = await bcrytp.hash("asasd0",8)
// console.log(hashedPwd);
// const valid = await bcrytp.compare("asasd0",hashedPwd);
// console.log(valid);
// }

// fun1();

// jwt demo

// const jwt = require("jsonwebtoken");

// const fun1 = () => {
    
//     // jwt.sign(payload, secretOrPrivateKey, [options, callback])
//     const token = jwt.sign({id:"abc123"},"this is signature");
//     console.log(token);
//     //token generate consist of three parts separated by . (dots) .
//     // 1st part is header contains info abt token
//     // 2nd part is our payload
//     // 3rd part is our signature or secret key. but it cannont be decoded to base64
//     const payload = jwt.verify(token,"this is signature");
//     //console.log(payload);
// }
// fun1();




app.listen(port,()=>{
    console.log("Server Established");
});