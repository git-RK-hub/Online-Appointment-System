const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
const createAndSendToken = (person, statusCode, res) => {
  const token = signToken(person._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.argv.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.argv.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  person.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      person
    }
  });
};

exports.signUp = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      address: req.body.address,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      qualifications: req.body.qualifications,
      category: req.body.category
    });
    if (newDoc.role === 'Patient') {
      newDoc.qualifications = undefined;
      newDoc.speciality = undefined;
    }

    createAndSendToken(newDoc, 201, res);
    try {
      const message =
        newDoc.role === 'Patient'
          ? 'Thanks for being a part of Remeduim! We are hoping and wishing you luck to find all possible remedies of your problem'
          : 'Thanks for being a part of Remeduim! Team Remedium is very thankful of you and wishing you all the best';

      await sendEmail({
        email: req.body.email,
        subject: 'Welcome to Remedium',
        message
      });
    } catch (err) {
      return next();
    }
  });

exports.login = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
      return next(new AppError('Please provide email and password', 400));
    }
    const doc = await Model.findOne({ email }).select('+password');

    if (!doc || !(await doc.comparePassword(doc.password, password))) {
      return next(new AppError('Invalid Cridentials! Please try again', 401));
    }
    createAndSendToken(doc, 200, res);
  });

exports.protect = (Model) =>
  catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) return next(new AppError('Login to access the page', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await Model.findById(decoded.id);

    if (!currentUser)
      return next(
        new AppError('The user belongs to this token does not exists', 401)
      );
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('The user recently changed password! Please login again')
      );
    }
    if (currentUser.role === 'Patient') req.patient = currentUser;
    else if (currentUser.role === 'Doctor') req.doctor = currentUser;

    next();
  });

exports.isLoggedIn = (Model) => async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log(decoded);

      // check if users still exists
      const currentUser = await Model.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // check if user change password after token issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      } //issuedAt : iat

      // There is a logged in user
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
    status: 'success'
  });
};

exports.forgotPassword = (Model) =>
  catchAsync(async (req, res, next) => {
    const user = await Model.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError(`There's no user with this email exists`, 404));
    }
    let type;
    if (user.role === 'Patient') {
      type = 'patient';
    } else if (user.role === 'Doctor') {
      type = 'doctor';
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/${type}/resetPassword/${resetToken}`;

    const message = `Forgot your password? Use this URL to reset your password : ${resetUrl} .\n If you didn't forget your password. Please ignore this email !`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Remedium: Your Password reset token',
        message
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError(
          'There was problem in sending mail! Please try again later',
          500
        )
      );
    }
  });

exports.resetPassword = (Model) =>
  catchAsync(async (req, res, next) => {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = Model.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    createAndSendToken(user, 200, res);
  });
