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

module.exports = model('Task', TaskSchema);
