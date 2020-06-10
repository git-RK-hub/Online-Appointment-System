const express = require('express');
const authController = require('../Controller/authController');
const slotsController = require('../Controller/slotsController');
const Doctor = require('../Model/doctorModel');

const router = express.Router();

router
  .route('/')
  .get(slotsController.getAllSlots)
  .post(authController.protect(Doctor), slotsController.createSlots);

router.get('/:id', slotsController.getSlotByDoctorId);

router.patch(
  '/updateslot',
  authController.protect(Doctor),
  slotsController.updateSlots
);

// router
//   .route('/getMySlots')
//   .get(authController.protect(Slots), slotsController.getMySlots);

module.exports = router;
