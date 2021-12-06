import patientModel from './patients.modal';
import UserModel from '../user/user.model';
import PollModel from '../poll/poll.model';
import doctorModel from "../doctor/doctor.model";
import feeModel from "../fee/fee.model";
import asyncHandler from '../../../middleware/async';
import dateFormat from "dateformat";
import { DATE } from "../../../common/constants";

// @desc      create patient
// @route     POST /v1/patient/create
// @access    Private
export const addPatient = asyncHandler(async (ctx) => {
  ctx.assert(ctx.request.body, 400, 'Please enter the  required fields');
  const { email, medicine, disease } = ctx.request.body;
  // add patient to request body so that it relates to its specific account
  const user = await UserModel.findOne({ email });
  ctx.request.body.user = user.id;
  ctx.request.body.doctor = user.username;
  const patient = await patientModel.find();
  ctx.request.body.adminSerial = patient.length;
  ctx.request.body.serial = patient.filter(item => item.doctor === user.username).length;
  if (medicine?.length > 0 && disease) {
    ctx.request.body.status = "waiting";
  }
  if (medicine?.length > 0 && disease) {
    await PollModel.updateMany({ typeOfId: {'$in': [1, 3, 0]}  }, {'$set':{ dbStatus: 'outdated' }})
  } else {
    await PollModel.updateMany({ typeOfId: {'$in': [1, 2]}  }, {'$set':{ dbStatus: 'outdated' }})
  }
  const fee = await feeModel.find();
  if (!fee.length > 0) {
    await feeModel.create({ fee : 10 })
  }

  const doctor = await doctorModel.find();

  const foundedDoctor = doctor?.length > 0 ? doctor?.filter(doc => doc.name === user.username) : [];

  await patientModel.create(ctx.request.body);

  const currentDoctor = doctor.filter(doc => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    return doc.name === user.username && doc.joinDate === today
  });

  if (foundedDoctor?.length > 0 && currentDoctor?.length > 0) {

    const allPatients = await patientModel.find();

    await doctorModel.findByIdAndUpdate( currentDoctor[0]._id,{
      totalPatients: allPatients.filter(item => {
        return item.doctor === user.username && item.joinDate === today;
      }).length,
    }, { new: true, runValidators: true })
  } else {
    await doctorModel.create({
      name: user.username,
      totalPatients: 1,
    })
  }

  ctx.status = 201;
  ctx.body = { success: true, status: 'Employee Successfully Created' };
});

// @desc      get all patient
// @route     Get /v1/patient/
// @access    Public
export const getAllPatients = asyncHandler(async (ctx) => {
  const patient = await patientModel.find();
  await PollModel.updateOne({ user: ctx.user.id }, {'$set':{ dbStatus: 'updated' }})
  ctx.status = 200;
  ctx.body = { success: true, length: patient.length, patient };
});

// @desc      get single patient
// @route     Get /v1/patient/:id
// @access    Private
export const singPatient = asyncHandler(async (ctx) => {
  const patient = await patientModel.findById(ctx.params.id);
  ctx.assert(patient, 404, 'Patient not found with this id');
  ctx.status = 200;
  ctx.body = { success: true, patient };
});

// @desc      update single patient
// @route     PUT /v1/patient/:id
// @access    Private
export const uptPatient = asyncHandler(async (ctx) => {
  const { medicine, disease } = ctx.request.body;
  const patient = await patientModel.findById(ctx.params.id);
  ctx.assert(patient,404, 'Patient not found with this id');
  // update patient related data
  if (medicine?.length > 0 && disease) {
    ctx.request.body.status = "waiting";
  }
  if (medicine?.length > 0 && disease) {
    await PollModel.updateMany({ typeOfId: {'$in': [1, 3, 0]}  }, {'$set':{ dbStatus: 'outdated' }})
  } else {
    await PollModel.updateMany({ typeOfId: {'$in': [1, 0, 2, 3]}  }, {'$set':{ dbStatus: 'outdated' }})
  }
  const userData = await UserModel.findById(patient.user);
  ctx.request.body.user = userData.id;
  ctx.request.body.doctor = userData.username;
  await patientModel.findByIdAndUpdate(ctx.params.id, ctx.request.body,{ new: true, runValidators: true });
  ctx.status = 200;
  ctx.body = { success: true, status: 'Patient Successfully Updated' };
});

// @desc      Delete single patient
// @route     DELETE /v1/patient/:id
// @access    Private
export const delPatient = asyncHandler(async (ctx) => {
  const patient = await patientModel.findById(ctx.params.id);
  ctx.assert(patient, 404, 'Patient not found with this id');
  patient.remove();
  ctx.status = 200;
  ctx.body = { success: true, status: 'Patient Successfully Deleted' };
});

// @desc      get single patient profile
// @route     Get /v1/patient/:id/record
// @access    Private
export const patientRecord = asyncHandler(async (ctx) => {
  const record = await patientModel.findOne({ user: ctx.user.id });
  ctx.assert(record, 404, 'Patient Record did not found with this id');
  ctx.status = 200;
  ctx.body = { success: true, record };
});

