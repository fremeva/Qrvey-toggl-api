/**
 * Task mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
const {
  STATUS_TASK,
  DEFAULT_FORMAT_DURATION_STRING
} = require('./../core/constant');

const STATUS_TASK_VALUES = Object.values(STATUS_TASK);

/**
 * Task schema mongoose to represent document in MongoDB
 * @constructor Task
 */
const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'owner is required'],
      autopopulate: { select: 'username name' }
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
      default: null,
      autopopulate: { select: 'name -owner' }
    },
    status: {
      type: String,
      required: [true, 'status is required'],
      enum: {
        values: STATUS_TASK_VALUES,
        message: '{VALUE} is not supported'
      },
      default: STATUS_TASK.RUNNING
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
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
    toObject: { getters: true },
    toJSON: {
      getters: true,
      transform: function (doc, ret) {
        return ret;
      }
    }
  }
);

// Virtual Population & autopulate
TaskSchema.virtual('trackingtimes', {
  ref: 'TrackingTimeTask',
  localField: '_id',
  foreignField: 'task',
  autopopulate: { select: '-_id -__v -durationMiliseconds -startDate -endDate' }
});

// Document Middleware
TaskSchema.pre('save', async function (next) {
  this.$locals.wasNew = this.isNew;
  this.$locals.modifiedPaths = this.modifiedPaths();
  next();
});

TaskSchema.post('save', async function (res, next) {
  const { wasNew, modifiedPaths } = this.$locals;
  if (
    !wasNew &&
    modifiedPaths.includes('status') &&
    res.status === STATUS_TASK.PAUSED
  ) {
    await model('TrackingTimeTask').findOneAndUpdate(
      { enDate: null, task: res._id },
      { endDate: Date.now() },
      { sort: { createdAt: -1 } }
    );
  } else {
    await model('TrackingTimeTask').create({ task: res._id });
  }
  next();
});

TaskSchema.post('findOneAndUpdate', async function (res, next) {
  const { status } = this.getUpdate().$set;
  if (status && status === STATUS_TASK.PAUSED) {
    await model('TrackingTimeTask').findOneAndUpdate(
      { enDate: null, task: res._id },
      { endDate: Date.now() },
      { sort: { createdAt: -1 }, new: true }
    );
  } else {
    await model('TrackingTimeTask').create({ task: res._id });
  }
  next();
});

/**
 *
 * @param {Document} res
 * @param {Function} next
 */
const deleteTriggerHander = async function (res, next) {
  await model('TrackingTimeTask').deleteMany({ task: res._id });
  next();
};
TaskSchema.post('findOneAndDelete', deleteTriggerHander);
TaskSchema.post('remove', deleteTriggerHander);

// Adding Plugins
TaskSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Task', TaskSchema);
