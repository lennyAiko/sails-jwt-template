var util = require('util');

async function getUser(data) {
    let userRecord = await User.findOne({ email: data })

    return new Promise((resolve, reject) => {
        if (!userRecord) {
            return reject('User not found')
        }

        return resolve(userRecord)
    })
}

describe('User (model)', function() {

  describe('#getUser()', function() {
    it('should return a user', function(done) {
      getUser("lenny@dev.com")
      .then(function(data) {

        if(data.length < 1) {
          return doesNotMatch(new Error(
            'Should return at least one user' +
            'But instead, got: '+util.inspect(data, {depth:null})+''
          ));
        }

        return done();

      })
      .catch(done);
    });
  });

});
