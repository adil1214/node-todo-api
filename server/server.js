require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');    
const {ObjectID} =  require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT; 

app.use(bodyParser.json());  

//  homepage route
app.get('/', (req, res) => {        
    res.status(201).send(
        '<h1>Welcome to the homepage :D <h1>' +
        '\n' + 
        '<h3><a href="/todos">Todos</a></h3>' +
        '\n' + 
        '<h3><a href="/users">Users</a></h3>'
    );
});

// users GET route <================================== this one needs to be removed !!
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.status(200).send(users);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// todos GET route
app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.status(200).send({
            todos,
            ourStatusCode: 418
        });

        // console.log('Fetching all the todos from the database at '+ new Date().toLocaleString() );
    }).catch((e) => {
        res.status(400).send(e);
    })
});


// todo by id GET route
app.get('/todos/:id', (req, res) => {
    let reqId = req.params.id;
    if (!ObjectID.isValid(reqId)) {     // if id not valid
        return res.status(404).send();
    }

    Todo.findById(reqId).then((todo) => {
        if (!todo) {     // if id is not in the database
            res.status(404).send({error: 'id not found in the database'});
        } else {
            // console.log('Fetching the todo with the id \"'+reqId+ '\" at ' + new Date().toLocaleString() );
            res.status(200).send({todo});
        }
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// todo by id DELETE route
app.delete('/todos/:id', (req, res) => {
    let reqId = req.params.id
    if (!ObjectID.isValid(reqId)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(reqId).then((doc) => {
        if (!doc) {
            res.status(404).send({error: 'id not found in the database'});
        } else {
            res.status(200).send({todo: doc});
        }
    }).catch((e) => {
        res.status(400).send(e);
    });
});


// users post route (sing-up route)
app.post('/users', (req, res) => {
    let user1 =  new User(_.pick(req.body,['email', 'password']));   

    user1.save()
    .then(() => {
        return user1.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user1);
    })
    .catch( (e) => {
        res.status(400).send(e);
    });
});

// todos post route
app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });

    todo.save()
    .then((doc) => {
        res.status(200).send(doc);
    }).catch( (e) => {
        res.status(400).send(e);
    });
});

// todos patch route (update/edit todo)
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

//
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started on port ${port} :D`);
});

module.exports = {app};


