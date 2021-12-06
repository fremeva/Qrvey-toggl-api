const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({});

module.exports = model('Task', TaskSchema);
