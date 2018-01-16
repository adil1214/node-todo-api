const MongoClient = require('mongodb').MongoClient,
    test = require('assert');

let url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, (err, db) => {
    // Get the collection
    let col = db.collection('find_one_and_delete');

    col.insertMany([{ a: 1, b: 1 }], { w: 1 }, (err, r) => {    // second parameter is the parameters object (wtf is a write concern??)
        test.equal(null, err);
        test.equal(1, r.result.n);

        console.log(r.result);

        // col.findOneAndDelete({ a: 1 }
        //     , { projection: { b: 1 }, sort: { a: 1 } }
        //     , (err, r) => {
        //         test.equal(null, err);
        //         test.equal(1, r.lastErrorObject.n);
        //         test.equal(1, r.value.b);

        //         // db.close();
        //     });
    });
});