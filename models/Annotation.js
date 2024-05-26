// models/Annotation.js
const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  songId: { type: Number, ref: 'Song', required: true },
  startIndex: { type: Number, required: true },
  endIndex: { type: Number, required: true },
  text: { type: String, required: true },
  createdBy: { type: String, required: true }, // User ID or name
  createdAt: { type: Date, default: Date.now }
});
annotationSchema.index({ songId: 1 }); // Create an index on the songId field
const Annotation = mongoose.model('Annotation', annotationSchema);

module.exports = Annotation;
