const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  // If the name field in data is not empty, keep it set to what it is.
  //If it is empty, then set to empty string because validators module operates on strings not objects
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title field is required.";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required.";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
