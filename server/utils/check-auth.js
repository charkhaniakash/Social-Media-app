const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  console.log("authHeader" , authHeader);
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
        console.log("running ")
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new AuthenticationError("Authentation token must be Bearer [token]");
  }
  throw new AuthenticationError("Authorization Header must be provided");
};
