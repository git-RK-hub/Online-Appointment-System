const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const viewRouter = require('./routes/viewRoutes');
const doctorRouter = require('./routes/doctorRoute');
const patientRouter = require('./routes/patientRoute');
const slotsRouter = require('./routes/slotsRoute');
const bookingsRouter = require('./routes/bookingRoute');
const globalErrorHandler = require('./Controller/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/bootstrap_css',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
);
app.use(
  '/bootstrap_js',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
);
app.use(
  '/popper',
  express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'))
);
app.use(
  '/jQuery',
  express.static(path.join(__dirname, 'node_modules/jquery/dist'))
);

app.use('/', viewRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/slots', slotsRouter);
app.use('/api/v1/bookings', bookingsRouter);

app.use(globalErrorHandler);

/**
 * Basically if any request make it to this point that means router
 * did not catch the request in that case a nicely
 * formatted error would be given to user
 * */
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Error',
    message: `Can't find the ${req.originalUrl} for this server`
  });
});

module.exports = app;
