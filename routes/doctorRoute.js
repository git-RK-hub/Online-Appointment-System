const express = require('express');
const doctorController = require('../Controller/doctorController');
const authController = require('../Controller/authController');
const slotsController = require('../Controller/slotsController');
const bookingRouter = require('./bookingRoute');
const Doctor = require('../Model/doctorModel');

const router = express.Router();

router.use('/:docId/bookings', bookingRouter);

router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword(Doctor));
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(
  '/getcurrentdocslots/',
  authController.protect(Doctor),
  slotsController.getCurrentDocSlots
);

router.route('/').get(doctorController.getAllDoctors);

router.route('/:id').get(doctorController.getDoctor);

router.post('/signup', authController.signUp(Doctor));

router.post('/login', authController.login(Doctor));

// router.patch(
//   '/updateslots',
//   authController.protect(Doctor),
//   doctorController.updateDocSlots
// );

router.delete(
  '/deleteMe',
  authController.protect(Doctor),
  doctorController.deleteMe
);

module.exports = router;
