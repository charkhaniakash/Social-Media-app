const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {validateRegisterInput, validateLoginInput} = require("../../utils/validators");



function generateToken(user){
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.userName,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      // validate user data

      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirmPassword,
        email
      );

      if(!valid){
        throw new UserInputError("Errors", { errors });
      }

      // make sure user doesnt allready exist

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This  username is taken",
          },
        });
      }

      //  hashing the password and created an authh token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res)

      return { ...res._doc, id: res._id.toString(), token };
    },

    async login(_ , {username , password}){
      const {valid , errors} = validateLoginInput(username, password);


      if(!valid){
        throw new UserInputError('Errors', {errors});
      }
      const user = await User.findOne({username});
      if(!user){
        errors.general = 'User Not Found';
        throw new UserInputError('User Not Found', {errors});
      }
      
      const match = await bcrypt.compare(password , user.password);
      if(!match){
        errors.general = 'Wroung Credentials';
        throw new UserInputError('Wroung Credentials', {errors});
      }

      const token = generateToken(user)

      return { ...user._doc, id: user._id.toString(), token };
    }
  },
};
