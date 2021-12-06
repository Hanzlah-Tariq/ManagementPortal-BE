import doctorModel from "./doctor.model";
import asyncHandler from "../../../middleware/async";

// @desc      get all associated doctor patients
// @route     Get /v1/doc/
// @access    private
export const getDoctorPatients = asyncHandler(async (ctx) => {
  const doc = await doctorModel.find();
  ctx.status = 200;
  ctx.body = { success: true, length: doc.length, doc };
});

