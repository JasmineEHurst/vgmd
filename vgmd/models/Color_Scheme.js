const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchemeSchema = ({
  css_link: {
    type: String,
    required: true
  },
  javascript_link: {
    type: String,
    required: true
  }
})
module.exports = ColorSchemeSchema = mongoose.model('colorSchemes', ColorSchemeSchema);
