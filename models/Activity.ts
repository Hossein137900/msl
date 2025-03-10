import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: ['pageview', 'click', 'scroll', 'search', 'product_view', 'page_time']
  },
  timestamp: {
    type: Number,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  visitCount: {
    type: Number,
    default: 1
  }
});

// Add index for better query performance
activitySchema.index({ path: 1, eventType: 1 });

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
