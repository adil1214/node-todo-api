const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

let {app} = require('./../server');
let {Todo} = require('./../models/todo');


const todosText = [{
    text: 'first test todo',
}, {
    text: 'second test todo',
}, {
    text: 'third test todo',
}, {
    text: 'eat breakfast',
}, {
    text: 'eat lunch',
}, {
    text: 'walk the dog',
}, {
    text: 'take a powernap',
}];


Todo.remove({}).then(() => {
    console.log('dummy data inserted into database :D ');    
    return Todo.insertMany(todosText);
}).catch((e) => {
    console.log(e);
});