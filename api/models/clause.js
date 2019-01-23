const mongoose = require('mongoose');

const clauseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: String
});


module.exports = mongoose.model('Clause', clauseSchema)
