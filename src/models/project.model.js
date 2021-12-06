const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({});

module.exports = model('Project', ProjectSchema);
