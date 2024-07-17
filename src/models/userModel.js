import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove the virtual `id` field when serializing to JSON
        delete ret.id;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove the virtual `id` field when serializing to JSON
        delete ret.id;
      },
    },
    timestamps: true,
  }
);

userSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'user',
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (ennteredPassword) {
  return await bcrypt.compare(ennteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
