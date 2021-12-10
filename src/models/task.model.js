/**
 * Task mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
const { STATUS_TASK } = require('./../core/constant');

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

// Virtual Population
TaskSchema.virtual('trackingtimes', {
  ref: 'TrackingTimeTask',
  localField: '_id',
  foreignField: 'task',
  autopopulate: { select: '-task duration' }
});
// TaskSchema.virtual('totaltimes', {ref: 'TrackingTimeTask', localField:'_id', foreignField:'task', count:true, autopopulate:true});

// Adding Plugins
TaskSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Task', TaskSchema);
