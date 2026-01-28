const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  taskCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

summarySchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Summary', summarySchema);