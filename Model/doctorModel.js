const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please tell us your name'],
      maxlength: [20, 'Name should be less than 20 characters'],
      minlength: [5, 'Name should be greater than 5 characters']
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
    qualifications: {
      type: String,
      required: [true, 'Please Enter your Qualification/s']
    },
    review: String,
    ratings: [
      {
        professionality: {
          type: Number,
          default: 3
        },
        service: {
          type: Number,
          default: 3
        },
        prcing: {
          type: Number,
          default: 3
        },
        recommendation: {
          type: Number,
          default: 3
        }
      }
    ],
    ratingsAverage: {
      type: Number,
      default: 4
    },
    location: {
      type: {
        type: String,
        default: 'point',
        enum: ['point']
      },
      coordinates: [Number],
      address: String
    },
    slug: String,
    category: {
      type: String,
      required: [true, 'Please specify your category']
    },
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
      default: 'Doctor'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

doctorSchema.pre('save', function (next) {
  if (!this.isModified || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

doctorSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

doctorSchema.methods.comparePassword = async function (passwordDB, password) {
  return await bcrypt.compare(password, passwordDB);
};

doctorSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
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

doctorSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.password = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

doctorSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

doctorSchema.virtual('slots', {
  ref: 'Slots',
  foreignField: 'doctor',
  localField: '_id'
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
