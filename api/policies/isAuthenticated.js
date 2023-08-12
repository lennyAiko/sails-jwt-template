module.exports = async (req, res, proceed) => {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');

    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }

    } else {
      return res.status(401).json({err: 'Format is unauthorized: Bearer [token]'});
    }
  } else {
    return res.status(401).json({err: 'No Authorization header was found'});
  }

  if (token) {

    if (token === req.session.token) {
      await sails.helpers.verifyToken(token, async (err, decode) => {
        if (err || !decode) {
          return res.status(401).json('Invalid token');
        }

        req.user = decode.user;
        req.issuer = decode.issuer;
        proceed();
      });
    } else {
      return res.status(401).json('Invalid token');
    }
  } else {
    return res.status(401).json({err: 'Not authenticated'});
  }

};
