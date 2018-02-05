var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let User = mongoose.model('Users', {
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    }
});

let user1 = new User({
    userName: 'username123',
    email: 'this_is_the_email'
});

user1.save().then( (doc) => {
    console.log('saved : \n', JSON.stringify(doc, undefined, 2));
}).catch( (e) =>{
    console.log('Error : \n' , JSON.stringify(e, undefined, 2));
});

//#region
/*
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true      // to remove the whitespaces at the edges of the string
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null   
    }
});

new Todo({
    text: '  eat breakfast  '
}).save().then( (doc) => {
    console.log('Saved todo: ' + JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Error: ',e);
});
========================================*/
//#endregion




//#region 2 ways to add to db
/*

// var newTodo = new Todo({
//     text: 'Cock dinner'
// });

// newTodo.save().then( (doc) => {
//     console.log('Saved todo: ' + doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });



// //===========================================================



let breakfastShema = new mongoose.Schema({
    eggs: {
        type: Number,
        required: true,
        min: [5, 'too few eggs..'],
        max :9
    },
    bacon: {
        type: Number,
        required: [true, 'why no bacon ?']
    },
    drink: {
        type: String,
        enum: ['coffee', 'tea'],
        required: [function () {
            return this.bacon > 2;
        }, `${this.bacon} bacons, u need something to drink ! `]
    }
});

//  between 5 and 9 eggs required 
**  bacon required 
**  drink required if more than 2 bacon
**  drink choices must respect the enum
// 

let breakfast = mongoose.model('breakfast', breakfastShema);

let badBreakfast = new breakfast ({
    eggs: 3,
    bacon: 4,

});

let error = badBreakfast.validateSync(); 
console.log(JSON.stringify(error.errors, undefined, 2));

// // to validate, you either use validateSync() or save()
// badBreakfast.save().then( (doc) => {
//     console.log('success : ' + JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Failure : ' + e);
// });

*/
//#endregion

