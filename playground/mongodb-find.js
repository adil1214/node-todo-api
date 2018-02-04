// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


let url = 'mongodb://localhost:27017/TodoApp';      //  <== the database is TodoApp

MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server.');
    }
    console.log('connected to mongodb server. ');


    // // fetching all the documents with a given criteria ================================
    // db.collection('Todos').find({
    //     _id: ObjectID("5a5a29ac5d483429ecc6a953")
    // }).toArray()
    // .then((docs) => {
    //     console.log('Todos : ');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // // counting the number of documents  =====================================
    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count: '+ count);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Andrew'}).toArray()
    .then((docs) => {
        console.log('Users: \n' + JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('error, unable to fetch the data: ', error);
    });




    // db.close();
});
