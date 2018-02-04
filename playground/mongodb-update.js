// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


let url = 'mongodb://localhost:27017/TodoApp';      //  <== the database is TodoApp


MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server.');
    }
    console.log('connected to mongodb server. ');

    let collName = ['Todos', 'Users'][1];
    let col = db.collection(collName);

    // col.findOneAndUpdate({
    //     _id : new ObjectID("5a5e2e1e459ecb4a6605caed")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( (result) => {
    //     console.log(result);
    // });

    // // ======================================================
    // col.find({completed: false}).toArray().then( (docs) => {
    //     // console.log(JSON.stringify(docs, undefined, 2));
    //     docs.forEach ( (doc, idx) => {
    //         console.log( (idx+1) + ": "+ doc.text);
    //     });
    // }).catch( (err) => {
    //     console.log('error :\n',err);
    // });

    col.findOneAndUpdate({
            name: 'Jen'
    }, {
        $set: {
            name: 'Adil'
        },
        $inc: {
            age: -28
        }
    }, {
        returnOriginal: false
    }).then( (result) => {
        console.log(result);
    });


    db.close();

});