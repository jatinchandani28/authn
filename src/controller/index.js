const util = require("util");
let connection = require("../database/db");
let ConnectionUtil = util.promisify(connection.query).bind(connection);

// ------------------------- Register Employee -----------------------------------
module.exports.UserSignUp = async (req, res) => {
  try {
    console.log("###");
    let { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, "$$$");
    if (!email) {
      return res.status(403).json({
        success: false,
        message: "email is required",
      });
    }
    //checking email from database
    var UserDetail = await ConnectionUtil(
      `select * from users where email='${email}'`
    );

    if (UserDetail == "") {
      if (password == confirmPassword) {
        let userObj = {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
        var employeeInsertQuery = await ConnectionUtil(
          `INSERT INTO users SET ?`,
          userObj
        );
        return res.status(200).json({
          success: true,
          message: "signed up successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "password does not match",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "email already exist",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// -------------------------login-----------------------------------
module.exports.User_Login = async (req, res) => {
    try {
      var { email, password } = req.body;
      var user = await ConnectionUtil(
        ` select * from users where email='${email}' and password='${password}'`
      );
      if (user != "") {
            return res.status(200).json({
              success: true,
              status: "200",
              message: "user login successful",
              data: user[0],
            });
      } else {
        return res.status(200).json({
          success: false,
          message: "email id or password does not match with our records",
          data: [],
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        status: "400",
        message: err.message,
      });
    }
  };
