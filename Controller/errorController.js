const AppError = require('./../utils/AppError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value : ${value} Please use another value`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid Token! Please Login again', 401);

const handleJWTExpireError = () =>
  new AppError('Token Expires ! Please Login again', 401);

const sendErrorDev = function (err, req, res) {
  // a) Api error
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      error: err,
      stack: err.stack,
      status: err.status,
      message: err.message
    });
  }
  // b) Rendered website error
  console.error('Error :/', err);
  res.status(err.statusCode).render('error', {
    title: 'Something went Wrong',
    msg: err.message
  });
};

const sendErrorProd = function (err, req, res) {
  // A) Api Error
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    console.error('Error :/', err);
    return res.status(500).json({
      status: 'fail',
      message: 'Something Went Wrong'
    });
  }
  if (err.isOperational) {
    res.status(err.statusCode).render('error', {
      title: 'Something went Wrong',
      msg: err.message
    });
  }
  console.error('Error :/', err);
  res.status(err.statusCode).render('error', {
    title: 'Something went Wrong',
    msg: 'Please try again later'
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'JsonWebToken') error = handleJWTError();
    if (error.name === 'TokenExpireError') error = handleJWTExpireError();
    sendErrorProd(error, req, res);
  }
};
