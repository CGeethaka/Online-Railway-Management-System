module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.body) {
    next();
  } else {
    res.status(401).send("You must login first!");
  }
};
