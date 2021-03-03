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

    // const returnedPromise = db.collection('users').updateOne({ name : "I dont "}, { 
    //     $set : {
    //         name : "Updated name"
    //     }
    // });        

    // const returnedPromise = db.collection('users').updateOne({ _id :new ObjectID('603dce594b52522f38ffbdff')}, { 
    //     $set : {
    //         name : "Updated name"
    //     }
    // }); 

    // returnedPromise.then((resolved) => 
    // {
    //     console.log(resolved);
    // }).catch( (rejected) => 
    // {console.log(rejected);
    
    // });

    const returnedPromise = db.collection('users').updateMany({ name : "Updated name"}, { 
        $set : {
            name : "Meet Sheth"
        }
    }); 

    returnedPromise.then((resolved) => 
    {
        console.log(resolved);
    }).catch( (rejected) => 
    {console.log(rejected);
    
    });

});