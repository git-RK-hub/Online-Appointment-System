const express = require('express');
const authController = require('../Controller/authController');
const bookingController = require('../Controller/bookingController');
const factory = require('../Controller/handleFactory');
const Bookings = require('../Model/bookingModel');
const Slots = require('../Model/slotsModel');
const Patient = require('../Model/patientModel');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(bookingController.getBookings)
  .post(
    authController.protect(Patient),
    bookingController.checkSlotRedundancy,
    bookingController.createBooking,
    factory.updateSlots(Slots, Bookings, 1)
  );

module.exports = router;
