var express = require('express');
var bodyParser = require('body-parser');    // still dont know what is this for

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');



var app = express();

app.use(bodyParser.json());     // using body-parser as middleware (??)

// post route
app.post('/todos', (req, res) => {
    // console.log(req.body);
    let todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });

    todo.save().then( (doc) => {
        // console.log('Saved succesufely !\n', doc);
        res.send(doc);
    }).catch( (e) => {
        // console.log('Error : ', e);
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});




