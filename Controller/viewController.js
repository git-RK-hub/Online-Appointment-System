const Doctor = require('../Model/doctorModel');
const Slots = require('../Model/slotsModel');
const Bookings = require('../Model/bookingModel');

exports.getOverview = (req, res) => {
  res.status(200).render('homepage', {
    title: 'Online Appointment System'
  });
};
exports.getSignup = (req, res) => {
  res.status(200).render('authenticate', {
    title: 'Register - Remedium',
    page: 'signup'
  });
};

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find();

  res.status(200).render('doctors', {
    title: 'Doctors - Remedium',
    doctors
  });
};

exports.getPatientProfile = async (req, res) => {
  const bookings = await Bookings.find({ patient: req.patient.id });
  res.status(200).render('patientProfile', {
    title: 'Dashboard | Patient',
    page: 'profile',
    bookings
  });
};

exports.getDoctorProfile = async (req, res) => {
  const bookings = await Bookings.find({ doctor: req.doctor.id });
  res.status(200).render('doctorProfile', {
    title: 'Dashboard | Doctor',
    page: 'profile',
    bookings
  });
};

exports.bookAppointment = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  const slots = await Slots.findOne({ doctor: { _id: req.params.id } });
  res.status(200).render('bookingSlots', {
    title: 'Book Appointment',
    doctor,
    slots
  });
};

exports.bookingPayment = async (req, res) => {
  res.status(200).render('bookingPayment', {
    title: 'Payment | Book Slot'
  });
};
