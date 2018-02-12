const expect = require('expect');
const request = require('supertest');
// mocha do not need to be required (it's a command-line app *FailFish*)

let {app} = require('./../server');
let {Todo} = require('./../models/todo');

// this is a hook that runs berfore each execution of a test
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        let text1 = 'test todo text';

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

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text1);
                    done();
                }).catch((e) => done(e) );
            });
    });

    it('Should not create todo with invalide body data', () => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                
                Todo.find().then((docs) => {
                    expect(docs.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e);
                });
            })
    });

});