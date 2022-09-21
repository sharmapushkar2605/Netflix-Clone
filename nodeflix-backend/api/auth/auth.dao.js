const userSchema = require("./auth.entity");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config')
const register = (user) => {
  return new Promise(async (resolve, reject) => {
    let success = false;
    try {
      const ifUser = await userSchema.findOne({ email: user.email });
      if (ifUser) {
        reject({ message: "This email is already taken", status: 200, success, severity:'warning' });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(user.password, salt);
      const newUser = new userSchema({
        email: user.email,
        password: secPass,
      });
      newUser
        .save()
        .then(() => {
          success= true;
          resolve({ message: "User registered", status: 200, success, severity:'success' });
        })
        .catch(() => {
          reject({ message: "Something went wrong", status: 500, success, severity:'error' });
        });
    } catch (error) {
      reject({ message: "Internal server error", status: 500, success, severity:'error' });
    }
  });
};

const login = (user) => {
  return new Promise(async (resolve, reject) => {
    let success = false;
    try {
      const ifUser = await userSchema.findOne({ email: user.email });
      if (!ifUser) {
        reject({ message: "User with this email not found", status: 200, success, severity:'warning' });
      }
      const compare = await bcrypt.compare(user.password, ifUser.password);
      if (!compare) {
        reject({ message: "Invalid password", status: 200, success, severity:'warning' });
      }
      const AUTH_TOKEN = jwt.sign(user,JWT_SECRET)
      success = true;
      resolve({ message: "Logged in Successfully", status: 200, authToken:AUTH_TOKEN, success, severity:'success' });
    } catch (error) {
      reject({ message: "Internal server error", status: 500, success, severity:'error' });
    }
  });
};
module.exports = {
  register,
  login
};
