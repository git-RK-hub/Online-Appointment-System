const Doctor = require('../Model/doctorModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllDoctors = catchAsync(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json({
    status: 'success',
    results: doctors.length,
    data: {
      doctors
    }
  });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id).populate('slots');
  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});

exports.createDoctor = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not defined try /signup instead'
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Doctor.findByIdAndUpdate(req.doctor.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// exports.getDoctors = catchAsync(async(req, res, next) => {
//     const topTenDoctor = Doctor.aggregate([
//         {
//             $match :
//         }
//     ])
// })
