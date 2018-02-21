const expect = require('expect');
const request = require('supertest');
// mocha do not need to be required (it's a command-line app *FailFish*)

let {app} = require('./../server');
let {Todo} = require('./../models/todo');

const todosText = [{
    text: 'first test todo'
}, {
    text: 'second test todo'
}, {
    text: 'third test todo'
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
});
