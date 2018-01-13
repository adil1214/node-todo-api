// const MongoClient = require('mongodb').MongoClient;
// const fs = require('fs');
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

// let user = {name: 'Andrew', age: 25};
// let {name} = user;      // object destructuring

let url = 'mongodb://localhost:27017/TodoApp';      //  <== the database is TodoApp

MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server.');
    }
    console.log('connected to mongodb server. ');


    // // inserting a todo into 'todos' collection ======================================
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    // // inserting a user into 'Users' collection =======================================
    // db.collection('Users').insertOne({
    //     name: 'Mathiew',
    //     age: 53,
    //     address: '59 melboure street, ca USA'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo. error:' , err);
    //     }
    //     // fs.writeFileSync('log.json', JSON.stringify(res, undefined, 2));
    //     // console.log(res);
    //     // console.log(JSON.stringify(res.ops, undefined, 2));

    //     console.log(res.ops[0]._id.getTimestamp());
    //     // // 2018-01-13T16:31:57.000Z
    // });






    db.close();
});
