const { Schema, model } = require('mongoose');

const UserSchema = new Schema({});

module.exports = model('User', UserSchema);
