const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateTagInput(data) {
  let errors = {};
  // If the name field in data is not empty, keep it set to what it is.
  //If it is empty, then set to empty string because validators module operates on strings not objects
  data.name = !isEmpty(data.name) ? data.name : "";

  if(validator.isEmpty(data.name)) {
    errors.name = "Tag must have a name."
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
