var express = require('express');
var bodyParser = require('body-parser');    

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');



var app = express();

app.use(bodyParser.json());  

app.get('/todos', (req, res) => {
    Todo.find({}).then((docs) => {
        res.status(200).json(docs);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

// post route
app.post('/todos', (req, res, next) => {
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


