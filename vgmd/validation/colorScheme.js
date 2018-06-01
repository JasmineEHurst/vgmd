const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateColorSchemeInput(data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ""
  data.css_link = !isEmpty(data.css_link) ? data.css_link : ""
  data.javascript_link = !isEmpty(data.javascript_link)
    ? data.javascript_link
    : ""
  if (validator.isEmpty(data.name)) {
    errors.MissingName = "There must be a name for the color scheme"
  }
  if (validator.isEmpty(data.css_link)) {
    errors.MissingCssLink = "There must be a css file for the color scheme"
  }
  if (validator.isEmpty(data.javascript_link)) {
    errors.MissingJavascriptLink =
      "There must be a javascript file for the color scheme"
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
}
