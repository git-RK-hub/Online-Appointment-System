const catchAsync = require('../utils/catchAsync');
const Bookings = require('../Model/bookingModel');

exports.getBookings = catchAsync(async (req, res, next) => {
  const bookings = await Bookings.find();
  res.status(200).json({
    status: 'success',
    data: {
      bookings
    }
  });
});

exports.checkSlotRedundancy = catchAsync(async (req, res, next) => {
  const { bookingDay, bookingSlot } = req.body;
  const bookedSlots = await Bookings.findOne({
    $and: [
      {
        $and: [{ bookingSlot: bookingSlot }, { bookingDay: bookingDay }]
      },
      {
        patient: { $ne: req.patient.id }
      }
    ]
  });
  if (bookedSlots) {
    res.status(400).json({
      status: 'fail',
      message: 'This slot is not available or already booked'
    });
  }
  next();
});

exports.createBooking = catchAsync(async (req, res, next) => {
  if (!req.body.doctor) req.body.doctor = req.params.docId;
  if (!req.body.patient) req.body.patient = req.patient.id;
  const find = await Bookings.findOne({
    $or: [
      {
        $and: [
          { bookingDay: req.body.bookingDay },
          { doctor: req.body.doctor },
          { patient: req.body.patient }
        ]
      },
      {
        $and: [
          { bookingDay: req.body.bookingDay },
          { bookingSlot: req.body.bookingSlot },
          { patient: req.body.patient }
        ]
      },
      {
        $and: [
          { bookingDay: req.body.bookingDay },
          { patient: req.body.patient }
        ]
      }
    ]
  });

  if (find) {
    return res.status(200).json({
      status: 'fail',
      message: `You have already booked a slot of doctor ${find.doctor.name} at ${find.bookingSlot} on ${find.bookingDay} ! Still you want to book a slot please select another day`
    });
  }
  next();
});
