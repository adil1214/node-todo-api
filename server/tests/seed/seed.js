const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const user1Id = new ObjectID();
const user2Id = new ObjectID();

const users = [{
    _id: user1Id,
    email: 'tempoaryEmail@gmail.com',
    password: 'HardP4sswordT0Guess',
    tokens: [{
        access: 'auth',
        // FIXME: make the salt an env variable
        token: jwt.sign({_id: user1Id.toHexString(), access:'auth'}, 'abc123').toString()
    }]
    }, {
    _id: user2Id,
    email: 'youssef@example.cc',
    password: '123456',
    tokens: [{
        access: 'auth',
        // FIXME: make the salt an env variable
        token: jwt.sign({_id: user2Id.toHexString(), access:'auth'}, 'abc123').toString()
    }]
}];


const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: user1Id
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: user2Id
}];


const populateTodos = (done) => {
    Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
    }).then(() => done())
    .catch((e) => done(e));
};


const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done())
    .catch((e) => done(e)); 
};


module.exports = {todos, users, populateTodos, populateUsers};