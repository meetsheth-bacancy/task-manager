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

    // we cant search _id:603dcd9cf208d52ae8dcf891 as obj ids are not stored as string in db
    db.collection('users').findOne({ _id : ObjectID('603dcd9cf208d52ae8dcf891')} , (error,result) => {
        if(error) {console.log(error);}
        else{
            console.log(result);
        }
    } );

    // find() doesnt have a callback function as its 2nd argument ; instead it returns cursor and cursor has a method 'toArray' which converts cursor to array
    db.collection('users').find({age : 21}).toArray((error,result)=>{
        console.log(result);
    });
    
    // it returns cursor coz it enables us to do a lot more with the reuturned data instead of just priting it
    // counting rows returned
    db.collection('users').find({age : 21}).count((error,result)=>{
        console.log(result);
    });
        
});