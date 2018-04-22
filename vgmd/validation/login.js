const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};
  // If the name field in data is not empty, keep it set to what it is.
  //If it is empty, then set to empty string because validators module operates on strings not objects
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
