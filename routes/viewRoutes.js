const express = require('express');
const viewController = require('../Controller/viewController');
const authController = require('../Controller/authController');
const Patient = require('../Model/patientModel');
const Doctor = require('../Model/doctorModel');

const router = express.Router();

router.use(authController.isLoggedIn(Patient));
router.use(authController.isLoggedIn(Doctor));

router.route('/').get(viewController.getOverview);
router.route('/signup').get(viewController.getSignup);
router.route('/doctors').get(viewController.getDoctors);
router
  .route('/patient-dashboard')
  .get(authController.protect(Patient), viewController.getPatientProfile);
router
  .route('/doctor-dashboard')
  .get(authController.protect(Doctor), viewController.getDoctorProfile);
router
  .route('/:id/payment-page')
  .get(authController.protect(Patient), viewController.bookingPayment);
router.route('/:id/book-appointment').get(viewController.bookAppointment);

module.exports = router;
