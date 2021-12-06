const { Schema, model } = require('mongoose');

const TrackingTimeTaskSchema = new Schema({});

module.exports = model('TrackingTimeTask', TrackingTimeTaskSchema);
