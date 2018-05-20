const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateEducationInput(data) {
  let errors = {};
  // If the name field in data is not empty, keep it set to what it is.
  //If it is empty, then set to empty string because validators module operates on strings not objects
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School field is required.";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required.";
  }
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study is required.";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
