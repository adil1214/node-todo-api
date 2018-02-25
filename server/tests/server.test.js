const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
// mocha do not need to be required (it's a command-line app *FailFish*)

let {app} = require('./../server');
let {Todo} = require('./../models/todo');

const todosText = [{
        text: 'first test todo',
        _id: new ObjectID()
    }, {
        text: 'second test todo',
        _id: new ObjectID()
    }, {
        text: 'third test todo',
        _id: new ObjectID()
}];

// this is a hook that runs berfore each execution of a test
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todosText);
    }).then( () => {
        done();
    }).catch(() => {
        done();
    });
    
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        let text1 = 'testing post request ...';

        request(app)
            .post('/todos')
            .send({text: text1})
            .expect(200)
            .expect((res) => {      // custom expect assertion
                expect(res.body.text).toBe(text1);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text:text1}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text1);
                    done();
                }).catch((e) => done(e) );
            });
    });

    it('Should not create todo with invalide body data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                
                Todo.find().then((docs) => {
                    expect(docs.length).toBe(3);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            }).end(done);
        
    });

    // it('should get a todo with a specific id', (done) =>{
    //     let id = '5a8cdb289ab25734a4fd4846';
    //     request(app)
    //         .get('/todos/'+id)
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res.body.text).toBe('first test todo');
    //         }).end(done);
    // });

});

describe('GET /todos/:id', () => {
    it('shoud return todo doc', (done) => {
        request(app)
            .get('/todos/' + todosText[0]._id)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todosText[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get('/todos/' + new ObjectID())
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe('id not found in the database');
            })
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/12345')
            .expect(404)
            .end(done);
    });
});

