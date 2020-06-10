const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.updateSlots = (Model, BookingModel, check) =>
  catchAsync(async (req, res, next) => {
    let updatedSlot;
    const day = req.body.day || req.body.bookingDay;
    const { slotOfDay, addTimeSlots } = req.body;
    const removeTimeSlots = req.body.removeTimeSlots || req.body.bookingSlot;

    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    if (req.doctor) {
      updatedSlot = await Model.findOne({
        doctor: { _id: req.doctor.id }
      });
    } else {
      updatedSlot = await Model.findOne({
        doctor: { _id: req.params.docId }
      });
    }
    let flag = -1;
    for (let i = 0; i < weekDays.length; i += 1) {
      if (day === weekDays[i]) {
        flag = i;
        break;
      }
    }
    if (flag === -1) {
      return next(new AppError('Please Select Appropriate Week Day name', 400));
    }
    if (slotOfDay === 'Morning') {
      if (addTimeSlots) {
        for (let j = 0; j < addTimeSlots.length; j += 1) {
          if (
            !updatedSlot.slots[flag].daySlots[0].timeSlots.includes(
              addTimeSlots[j]
            )
          ) {
            updatedSlot.slots[flag].daySlots[0].timeSlots.push(addTimeSlots[j]);
          }
        }
      }
      if (removeTimeSlots) {
        updatedSlot.slots[flag].daySlots[0].timeSlots = updatedSlot.slots[
          flag
        ].daySlots[0].timeSlots.filter((val) => !removeTimeSlots.includes(val));
      }
    } else if (slotOfDay === 'Afternoon') {
      if (addTimeSlots) {
        for (let j = 0; j < addTimeSlots.length; j += 1) {
          if (
            !updatedSlot.slots[flag].daySlots[1].timeSlots.includes(
              addTimeSlots[j]
            )
          ) {
            updatedSlot.slots[flag].daySlots[1].timeSlots.push(addTimeSlots[j]);
          }
        }
      }
      if (removeTimeSlots) {
        updatedSlot.slots[flag].daySlots[1].timeSlots = updatedSlot.slots[
          flag
        ].daySlots[1].timeSlots.filter((val) => !removeTimeSlots.includes(val));
      }
    } else if (slotOfDay === 'Evening') {
      if (addTimeSlots) {
        for (let j = 0; j < addTimeSlots.length; j += 1) {
          if (
            !updatedSlot.slots[flag].daySlots[2].timeSlots.includes(
              addTimeSlots[j]
            )
          ) {
            updatedSlot.slots[flag].daySlots[2].timeSlots.push(addTimeSlots[j]);
          }
        }
      }
      if (removeTimeSlots) {
        updatedSlot.slots[flag].daySlots[2].timeSlots = updatedSlot.slots[
          flag
        ].daySlots[2].timeSlots.filter((val) => !removeTimeSlots.includes(val));
      }
    } else {
      return next(
        new AppError(
          `Please select 'Morning', 'Afternoon', 'Evening' as slotOfDay`,
          500
        )
      );
    }

    if (req.doctor) {
      await Model.replaceOne({ doctor: { _id: req.doctor.id } }, updatedSlot, {
        runValidators: true
      });
    } else {
      await Model.replaceOne(
        { doctor: { _id: req.params.docId } },
        updatedSlot,
        {
          runValidators: true
        }
      );
    }
    if (!check) {
      res.status(200).json({
        status: 'success',
        data: {
          updatedSlot
        }
      });
    } else {
      const newBooking = await BookingModel.create(req.body);
      res.status(200).json({
        status: 'success',
        data: {
          newBooking
        }
      });
    }
  });
