const mongoose = require('mongoose');

const clauseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {type: String, required: true}
});


module.exports = mongoose.model('Clause', clauseSchema)
