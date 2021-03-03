// Crud operations
 
const { MongoClient , ObjectID, ObjectId } = require('mongodb');

const connectionURL= "mongodb://127.0.0.1:27017";
const databaseName = "task_manager";

// const id = new ObjectId();
// console.log("Custom generated object id : "+id);
// console.log(id.getTimestamp());

// object id's are not string , they are stored as binary
// console.log(id.id.length); // binary takes half the storage
// console.log(id.toHexString().length); 

MongoClient.connect(connectionURL, { useNewUrlParser : true , useUnifiedTopology: true} , (error,client) => {
    if(error)
    {
        return console.log("Connection failed!");
    }
    console.log("Connection established");

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        // _id : id,
        name : "I dont know",
        age : 21
    }, (error,result) => {
        if(error) {console.log(error);}
        else
        {
            // result.ops is an array of inserted documents
            console.log(result.ops);
            // returns no. of inserted docs
            console.log(result.insertedCount);
            // returns _id
            console.log(result.insertedId);
        }
    });

});

// db.collection('users').insertMany([{
//     name : "Karan",
//     age : 21
//     },{
//       name : "Raj",
//       age :55  ,
//       hobby: "singing"
//     }], (error,result) => {
//         if(error) {console.log(error);}
//         else
//         {
//             // result.ops is an array of inserted documents
//             console.log(result.ops);
//             // returns no. of inserted docs
//             console.log(result.insertedCount);
//        }
//     });



// db.collection('tasks').insertMany([
//     {
//         description : "Task1",
//         completed : true
//     },
//     {
//         description : "Task2",
//         completed : false
//     },
//     {
//         description : "Task3",
//         completed : true
//     }],
//     (error,result)=>{
//         if(error) {console.log(error);}
//         else
//         {
//             console.log(result.ops);
//         }
//     });

