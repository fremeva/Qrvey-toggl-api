/**
 * Tracking Time Task mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
const { DEFAULT_FORMAT_DURATION_STRING } = require('./../core/constant');
const {
  getDateDiffInMilliseconds,
  transformMillisecondsToFormatDate
} = require('../helpers');
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
    durationMilliseconds: {
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

// Document, Models and Query Middlewares
TrackingTimeTaskSchema.pre('save', async function (next) {
  const doc = this;
  const isCompleted = !doc.isNew && doc.isModified('endDate');
  if (isCompleted) {
    doc.durationMilliseconds = await getDateDiffInMilliseconds(
      doc.startDate,
      doc.endDat
    );
    doc.duration = await transformMillisecondsToFormatDate(
      doc.durationMilliseconds
    );
  }
  next();
});

TrackingTimeTaskSchema.pre('findOneAndUpdate', async function (next) {
  const { endDate } = this.getUpdate();
  if (endDate) {
    const doc = await this.model.findOne(this.getQuery());
    const durationMilliseconds = await getDateDiffInMilliseconds(
      doc.startDate,
      endDate
    );
    this.set({
      durationMilliseconds,
      duration: await transformMillisecondsToFormatDate(durationMilliseconds)
    });
  }
  next();
});

module.exports = model('TrackingTimeTask', TrackingTimeTaskSchema);
