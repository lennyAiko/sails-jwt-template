const supertest = require('supertest');


describe('Auth (api)', function() {
    describe('login', function() {
        it('should respond with tokens', function(done) {
            supertest(sails.hooks.http.app)
                .post('/auth/signin')
                .send({ username: 'lenny', password: 'vanlenny' })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    if (!res.body) return done("No content found!")
                    return done()
                })
        });

        it('should respond with invalid', function(done) {
            supertest(sails.hooks.http.app)
                .post('/auth/signin')
                .send({ username: 'lennyy', password: 'vanlenny' })
                .expect(401)
                .expect({error: "Invalid credentials"}, {}, done)
        })
    });
}) 

