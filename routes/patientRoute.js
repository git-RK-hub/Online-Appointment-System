const express = require('express');
const patientController = require('../Controller/patientController');
const authController = require('../Controller/authController');
const Patient = require('../Model/patientModel');

const router = express.Router();

router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword(Patient));
router.patch('/resetPassword/:token', authController.resetPassword);

router.route('/').get(patientController.getAllPatientData);

router.route('/:id').get(patientController.getPatient);

router.post('/signup', authController.signUp(Patient));

router.post('/login', authController.login(Patient));

router.delete(
  '/deleteMe',
  authController.protect(Patient),
  patientController.deleteMe
);

module.exports = router;
