const sails = require('sails');

before(function (done) {
  this.timeout(5000);

  sails.lift({
    log: { level: 'silent' }
  }, function (err) {
    if (err) { return done(err); }

    return done(err, sails);
  });
});

after(function (done) {
  sails.lower(done);
});
