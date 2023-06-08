const bcrypt = require("bcrypt");
const { UserModel } = require("../model/UserModel");

const Authentication = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const User = await UserModel.findOne({ email: email });
    bcrypt.compare(password, User.password, (err, result) => {
      if (result) {
        next();
      } else {
        res.json({
          msg: "error occured",
        });
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Authentication };
