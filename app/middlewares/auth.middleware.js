const checkForUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //console.log(authHeader);
  if (!authHeader) {
    return res.status(403).send({
      message: "unaythorised: user id not found",
    });
  }

  const authSplit = authHeader.split(" ");
  if (authSplit.length != 2) {
    return res.status(403).send({
      message: "unaythorised: user id is in invalid format",
    });
  }
  const userId = authSplit[1];
  res.locals.user = userId;

  next();
};

module.exports = {
  checkForUser,
};
