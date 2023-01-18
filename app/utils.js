const jwt = require("jsonwebtoken");

const makeJWT = (payload) => {
  const token = jwt.sign(
    {
      ...payload,
      //exp:-1
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

const verifyJWT = ({ token }) => {
  console.log("token=>", token);
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  makeJWT,
  verifyJWT,
};
