const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // If the name field in data is not empty, keep it set to what it is.
  //If it is empty, then set to empty string because validators module operates on strings not objects
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters.";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password field is required.";
  }
  if (!validator.equals(data.passwordConfirm, data.password)) {
    errors.passwordConfirm = "Passwords must match.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
