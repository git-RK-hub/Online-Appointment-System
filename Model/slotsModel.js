const mongoose = require('mongoose');

const slotsSchema = new mongoose.Schema(
  {
    slots: [
      {
        day: {
          type: String,
          enum: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ]
        },
        daySlots: [
          {
            slotOfDay: {
              type: String,
              enum: ['Morning', 'Afternoon', 'Evening'],
              required: [true, `Day is required`]
            },
            timeSlots: {
              type: [String],
              enum: [
                '10:20 AM',
                '10:40 AM',
                '11:00 AM',
                '11:20 AM',
                '11:40 AM',
                '12:00 PM',
                '01:40 PM',
                '02:00 PM',
                '02:20 PM',
                '02:40 PM',
                '03:00 PM',
                '03:20 PM',
                '03:40 PM',
                '04:00 PM',
                '04:20 PM',
                '04:40 PM',
                '05:00 PM',
                '05:20 PM',
                '05:40 PM',
                '06:00 PM',
                '06:20 PM',
                '06:40 PM',
                '07:00 PM',
                '07:20 PM',
                '07:40 PM',
                '08:00 PM',
                '08:20 PM',
                '08:40 PM',
                '09:00 PM'
              ]
            }
          }
        ]
      }
    ],
    doctor: {
      type: mongoose.Schema.ObjectId,
      unique: [true, 'You can not have duplicate slots'],
      ref: 'Doctor',
      required: [true, 'Slots must belong to a doctor']
    }
  },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true }
  }
);

slotsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'doctor',
    select: 'name email'
  });
  next();
});

const Slots = mongoose.model('Slots', slotsSchema);

module.exports = Slots;
