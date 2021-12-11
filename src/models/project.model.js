/**
 * Project mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
const { DEFAULT_FORMAT_DURATION_STRING } = require('../core/constant');
/**
 * Project schema mongoose to represent document in MongoDB
 * @constructor Project
 */
const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: { select: 'username name' }
    },

    durationMilliseconds: {
      type: Number,
      required: false,
      default: 0
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
    toObject: { getters: true }
  }
);

// Virtual Population & autopopulate
// Adding Plugins
ProjectSchema.plugin(require('mongoose-autopopulate'));

/**
 * Delete trigger Handler function
 *
 * @async
 * @param {Document} res
 * @param {Function} next
 */
const deleteTriggerHander = async function (res, next) {
  const filter = { project: res._id };
  const tasks = await model('Task').find(filter).select('name _id');
  const ids = tasks.map((t) => t._id);
  // Clean related data
  model('Task').deleteMany(filter);
  model('TrackingTimeTask').deleteMany({ task: { $in: ids } });
  next();
};
ProjectSchema.post('findOneAndDelete', deleteTriggerHander);
ProjectSchema.post('remove', deleteTriggerHander);

module.exports = model('Project', ProjectSchema);
