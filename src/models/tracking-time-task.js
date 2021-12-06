/**
 * Tracking Time Task mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
/**
 * Tracking time task schema mongoose to represent document in MongoDB
 * @constructor TrackingTimeTask
 */
const TrackingTimeTaskSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: [true, 'task is required']
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: false
    },
    duration: {
      type: Number,
      required: false
    }
  },
  {
    toObject: { getters: true }
  }
);

module.exports = model('TrackingTimeTask', TrackingTimeTaskSchema);
