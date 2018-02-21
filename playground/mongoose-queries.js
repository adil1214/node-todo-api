let {ObjectID} = require('mongodb');

let {mongoose} = require('./../server/db/mongoose');
let {Todo} = require('./../server/models/todo');
let {User} = require('./../server/models/user');

let id = '5a8cdb289ab25734a4fd484';         // a todo id
let id2 = '5a78b7dcb75cf91d50d7192c';      // a user id

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid :(\n');
// }

//#region query a todo by id 

// mongoose.Types.ObjectId.isValid

// // returns an array
// Todo.find({ 
//     _id: id
// }).then((todos) => {
//     console.log('\nTodos: \n',todos);
// }).catch((e) => {
//     console.log('Error: \n' ,e);
// });


// // returns an object/document
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('\nTodo: \n',todo);
// }).catch((e) => {
//     console.log('Error: \n' ,e);
// });


// // returns an object/document
// Todo.findById(id)
// .then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('\nTodo by id : \n',todo);
// }).catch((e) => {
//     console.log('Error: \n' ,e);
// });
//#endregion


User.findById(id2).then((user) => {
        if (!user) {
            return console.log('User not found');
        }
        console.log('User found:\n', user);
    }).catch((e) => {
        console.log('Error: \n', e);
});