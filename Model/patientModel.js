const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please tell us your email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please enter your valid email']
    },
    contact: {
      type: String,
      required: [true, 'Please tell us your contact number'],
      maxlength: [10, 'Please Provide 10 digit mobile number'],
      minlength: [10, 'Please Provide 10 digit mobile number']
    },
    address: {
      type: String,
      required: [true, 'Please provide us your address']
    },
    photo: {
      type: String
    },
    slug: String,
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password length must be greater than 8 characters'],
      select: false
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password is not matching'
      }
    },
    passwordChangedAt: {
      type: Date
    },
    passwordResetToken: String,
    passwordResetExpires: String,
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    role: {
      type: String,
      default: 'Patient'
    },
    symptomsOf: {
      type: [String]
    },
    appointDates: {
      type: [Date],
      default: 0
    }
  },
  {
    versionKey: false
  }
);

patientSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

patientSchema.pre('save', function (next) {
  if (!this.isModified || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

patientSchema.methods.comparePassword = async function (passwordDB, password) {
  return await bcrypt.compare(password, passwordDB);
};

patientSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.password = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

patientSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStmamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(changedTimeStmamp, JWTTimestamp);
    return JWTTimestamp < changedTimeStmamp;
  }
  return false;
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
