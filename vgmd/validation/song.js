const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateSongInput(data) {
  let errors = {}
  // If the name field in data is not empty, keep it set to what it is.
  //If it is empty, then set to empty string because validators module operates on strings not objects
  data.name = !isEmpty(data.name) ? data.name : ""
  data.youtube_link = !isEmpty(data.youtube_link) ? data.youtube_link : ""
  data.soundtrack = !isEmpty(data.soundtrack) ? data.soundtrack : ""
  data.composer = !isEmpty(data.composer) ? data.composer : ""
  data.created = !isEmpty(data.created) ? data.created : ""

  if (validator.isEmpty(data.name)) {
    errors.MissingNameField = "The song must have a name."
  }
  if (validator.isEmpty(data.youtube_link)) {
    errors.MissingYoutubeLink = "The song must have a youtube link."
  }
  if (!validator.isURL(data.youtube_link)) {
    errors.InvalidURL = "The youtube link is an invalid URL."
  }
  if (validator.isEmpty(data.soundtrack)) {
    errors.MissingSoundtrack = "The song must have a soundtrack."
  }
  if (validator.isEmpty(data.composer)) {
    errors.MissingComposer = "The song must have a composer."
  }
  if (validator.isEmpty(data.created)) {
    errors.MissingDate = "The song must have a date."
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
