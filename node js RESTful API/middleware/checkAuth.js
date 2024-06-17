if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {


  // get token from header
  const token = req.header("autherization");

  // check if token is present
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          message: "No Token",
        },
      ],
    });
  }

  try {
    // verify token is correct and in date (throws error if not) -> converts back to email and password object
    let user = await JWT.verify(token, process.env.SECURE_KEY);
    // save user data to req object so can be accessed by express router
    req.user = user.data;

    // is complete so continue with router function
    next();
  } catch (error) {
    // return an error message
    return res.status(400).json({
      errors: [
        {
          message: "Invalid Token",
        },
      ],
    });
  }
};
