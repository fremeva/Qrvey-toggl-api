/**
 * Tracking Time Task mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
const { DEFAULT_FORMAT_DURATION_STRING } = require('./../core/constant');
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
      required: false,
      default: null
    },
    durationMiliseconds: {
      type: Number,
      required: false,
      default: null
    },
    duration: {
      type: String,
      require: false,
      default: DEFAULT_FORMAT_DURATION_STRING
    }
  },
  {
    toObject: { getters: true }
  }
);

module.exports = model('TrackingTimeTask', TrackingTimeTaskSchema);
