// Crud operations
 
const { MongoClient , ObjectID, ObjectId } = require('mongodb');

const connectionURL= "mongodb://127.0.0.1:27017";
const databaseName = "task_manager";

MongoClient.connect(connectionURL, { useNewUrlParser : true , useUnifiedTopology: true} , (error,client) => {
    if(error)
    {
        return console.log("Connection failed!");
    }
    console.log("Connection established");

    const db = client.db(databaseName);

    // refer individual C R U D js files

});