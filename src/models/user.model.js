/**
 * User mongoose model module
 * @module Models
 */
const { Schema, model } = require('mongoose');
const argon2 = require('argon2');
/**
 * User schema mongoose to represent document in MongoDB
 * @constructor User
 */
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    name: {
      type: String,
      required: false,
      trim: true
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
        // Deleting sensitive data
        delete ret.password;
        return ret;
      }
    }
  }
);

/**
 * Compare password with user password from db
 *
 * @async
 * @param {String} password password value to compare
 * @returns {Promise<Boolean>} return a Promise with boolean value if password match with password hashed
 */
UserSchema.methods.comparePassword = async function (password) {
  return await argon2.verify(this.password, password);
};

/**
 * Document Middleware to set password pre save.
 */
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }
  const passwordHashed = await argon2.hash(user.password);
  user.password = passwordHashed;
  next();
});

// Virtuals
/* UserSchema.virtual('numTasks', {
  ref:'Task',
  localField: '_id',
  foreignField: 'owner',
  count: true,
  autopopulate:true
});

UserSchema.virtual('numProjects', {
  ref:'Task',
  localField: '_id',
  foreignField: 'owner',
  count: true,
  autopopulate:true
}); */

//Adding plugins
UserSchema.plugin(require('mongoose-beautiful-unique-validation'));
UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('User', UserSchema);
