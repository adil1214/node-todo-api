// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


let url = 'mongodb://localhost:27017/TodoApp';      //  <== the database is TodoApp

MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server.');
    }
    console.log('connected to mongodb server. ');

    // deleteMany , deleteOne , findOneAndDelete
    let col = db.collection('Users');

// =======================================================================

    // col.deleteOne({text: 'eat lunch'}).then((result) => {
    //     console.log(result.result);
    // });

// =======================================================================

    // col.deleteMany({name: 'Mathiew'}).then( (res) => {
    //     console.log('Deleted Many :', res.result);
    // }, (error) => {
    //     if (error) {
    //         console.log('error : ',error);
    //     }
    // });

// =======================================================================


    // col.findOneAndDelete({_id: ObjectID('5a5e38ec459ecb4a6605ce46')}).then( (res) => {
    //     console.log('Found one and deleted it :', res);
    // }, (error) => {
    //     if (error) {
    //         console.log('error : ',error);
    //     }
    // });


    // db.close();
});
