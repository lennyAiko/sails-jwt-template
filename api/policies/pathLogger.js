module.exports = async (req, res, proceed) => {
  sails.log(`${req.method} - ${req.url}`);
  return proceed();
};
