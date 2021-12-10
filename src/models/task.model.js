/**
 * Task mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
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
      autopopulate: true
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
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
TaskSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Task', TaskSchema);
