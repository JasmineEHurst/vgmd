const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchemeSchema = new Schema ({
  name: {
    type: String,
    require: true
  },
  css_link: {
    type: String,
    required: true
  },
  javascript_link: {
    type: String,
    required: true
  }
})

module.exports = ColorScheme = mongoose.model('colorSchemes', ColorSchemeSchema);
