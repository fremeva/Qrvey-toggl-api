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
    toObject: { getters: true }
  }
);

// Virtual Population & autopopulate
// Adding Plugins
ProjectSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Project', ProjectSchema);
