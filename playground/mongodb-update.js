// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


let url = 'mongodb://localhost:27017/TodoApp';      //  <== the database is TodoApp


MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server.');
    }
    console.log('connected to mongodb server. ');

    let collName = ['Todos', 'Users'][0];
    let col = db.collection(collName);

    // col.findOneAndUpdate({})

    // // ======================================================
    // col.find().toArray().then( (docs) => {
    //     // console.log(JSON.stringify(docs, undefined, 2));
    //     docs.forEach ( (doc, idx) => {
    //         console.log( (idx+1) + ": "+ doc.text);
    //     });
    // }).catch( (err) => {
    //     console.log('error :\n',err);
    // });


    db.close();

});