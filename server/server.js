let express = require('express');
let bodyParser = require('body-parser');    
let {ObjectID} =  require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');



let app = express();

app.use(bodyParser.json());  

app.get('/', (req, res) => {
    res.status(201).send(
        '<h1>Welcome to the homepage :D <h1>' +
        '\n' + 
        '<h3><a href="/todos">Todos</a></h3>'
    );
});

// users GET route
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
            ourStatusCode: 420
        });

        let nowDate = new Date();

        console.log('Fetching all the todos from the database at '+ nowDate.toLocaleString() );
    }).catch((e) => {
        res.status(400).send(e);
    })
});


// todo by id GET route
app.get('/todos/:id', (req, res) => {
    let reqId = req.params.id
    if (!ObjectID.isValid(reqId)) {
        return res.status(404).send();
    }

    Todo.findById(reqId).then((doc) => {
        if (!doc) {
            res.status(404).send({error: 'id not found in the database'});
        } else {
            res.status(200).send(doc);
        }
    }).catch((e) => {
        res.status(400).send(e);
    });
});


// post route
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

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};


