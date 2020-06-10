const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const Slots = require('../Model/slotsModel');

exports.getAllSlots = catchAsync(async (req, res, next) => {
  const allSlots = await Slots.find();
  res.status(200).json({
    status: 'success',
    data: {
      allSlots
    }
  });
});

exports.createSlots = catchAsync(async (req, res, next) => {
  if (!req.body.doctor) req.body.doctor = req.doctor.id;
  const slots = [];
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  for (let i = 0; i < 7; i += 1) {
    const object = {};
    req.body.day = weekDays[i];
    object.daySlots = req.body.daySlots;
    object.day = req.body.day;
    slots.push(object);
  }
  req.body.slots = slots;
  const newSlots = await Slots.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      newSlots
    }
  });
});

exports.getCurrentDocSlots = catchAsync(async (req, res, next) => {
  const currentSlots = await Slots.findOne({ doctor: { _id: req.doctor.id } });
  res.status(200).json({
    status: 'success',
    data: {
      currentSlots
    }
  });
});

exports.getSlotByDoctorId = catchAsync(async (req, res, next) => {
  const slot = await Slots.findOne({ doctor: { _id: req.params.id } });
  res.status(200).json({
    status: 'success',
    data: {
      slots: slot.slots
    }
  });
});

exports.updateSlots = factory.updateSlots(Slots);
