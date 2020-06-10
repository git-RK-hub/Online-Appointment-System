const Patient = require('../Model/patientModel');
const catchAsync = require('../utils/catchAsync');

exports.createPatientProfile = (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'This route is not defined, try /patient/signup instead'
  });
};

exports.getAllPatientData = catchAsync(async (req, res, next) => {
  const patients = await Patient.find();
  res.status(201).json({
    status: 'succes',
    result: patients.length,
    data: {
      patients
    }
  });
});

exports.getPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      patient
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Patient.findByIdAndUpdate(req.patient.id, { active: false });
  res.status(204).json({
    data: null
  });
});
