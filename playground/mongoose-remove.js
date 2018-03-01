let {ObjectID} = require('mongodb');

let {mongoose} = require('./../server/db/mongoose');
let {Todo} = require('./../server/models/todo');
let {User} = require('./../server/models/user');

/*  There are 3 methods for deleting records
**  Todo.remove()
**  Todo.findOneAndRemove()
**  Todo.findByIdAndRemove()
 */

 Todo.remove({}).then((res) => {
    console.log(res);
 }).catch((e) => {
    console.log(e);
 });

