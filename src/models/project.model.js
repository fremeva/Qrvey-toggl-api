/**
 * Project mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
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
      autopopulate: true
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

// Adding Plugins
ProjectSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Project', ProjectSchema);
