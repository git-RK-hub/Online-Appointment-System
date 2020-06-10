const mongoose = require('mongoose');
// const Slots = require('../Model/slotsModel');

const bookingSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'Slot must belong to a doctor']
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'Slot should be booked by a patient']
  },
  bookingSlot: {
    type: String,
    required: [true, 'A booking slot is required']
  },
  bookingDay: {
    type: String,
    required: [true, 'Select the day of booking']
  },
  slotOfDay: {
    type: String,
    required: [true, 'Please select Slot of the day']
  },
  date: {
    type: [String]
  },
  time: [String]
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'doctor',
    select: 'name'
  }).populate({
    path: 'patient',
    select: 'name'
  });
  next();
});

bookingSchema.pre('save', function (next) {
  const currDate = new Date(Date.now());
  this.date = currDate.toDateString();
  const hour =
    currDate.getHours() <= 12 ? currDate.getHours() : currDate.getHours() - 12;
  const min = currDate.getMinutes();
  const meredian = currDate.getHours < 13 ? 'AM' : 'PM';
  this.time = `${hour}:${min} ${meredian}`;
  next();
});

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;
