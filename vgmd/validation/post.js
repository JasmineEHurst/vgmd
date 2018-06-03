const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : ""
  data.title = !isEmpty(data.title) ? data.title : ""

  if (validator.isEmpty(data.text)) {
    errors.MissingTextField = "The post must contain text."
  }
  if (!validator.isLength(data.text, {min:10})) {
    errors.MinimumText = "The post text must be at least 10 characters."
  }
  if (validator.isEmpty(data.title)) {
    errors.MissingTitleField = "The post must contain title."
  }
  if (!validator.isLength(data.title, {min:10})) {
    errors.MinimumTitle = "The post title must be at least 10 characters."
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
