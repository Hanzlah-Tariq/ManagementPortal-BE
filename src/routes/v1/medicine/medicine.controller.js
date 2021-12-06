import medicineModel from '../medicine/medicine.model';
import asyncHandler from '../../../middleware/async';

// @desc      get all medicines
// @route     Get /v1/medicine/
// @access    private
export const getMedicines = asyncHandler(async (ctx) => {
  const medicines = await medicineModel.find();
  ctx.status = 200;
  ctx.body = { success: true, length: medicines.length, medicines };
});

// @desc      add medicine
// @route     POST /v1/medicine/create
// @access    Private
export const addMedicine = asyncHandler(async (ctx) => {
  ctx.assert(ctx.request.body, 400, 'Please enter the  required fields');
  // save medicine data
  await medicineModel.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = { success: true, status: 'Medicine Successfully Added' };
});

// @desc      update single medicine
// @route     PUT /v1/medicine/:id
// @access    Private
export const updateMedicine = asyncHandler(async (ctx) => {
  const medicine = await medicineModel.findById(ctx.params.id);
  ctx.assert(medicine, 404, 'Medicine not found with this id');
  await medicineModel.findByIdAndUpdate(ctx.params.id, ctx.request.body,{ new: true, runValidators: true });
  ctx.status = 200;
  ctx.body = { success: true, status: 'Medicine Successfully Updated' };
});

// @desc      Delete single medicine
// @route     DELETE /v1/medicine/:id
// @access    Private
export const deleteMedicine = asyncHandler(async (ctx) => {
  const medicine = await medicineModel.findById(ctx.params.id);
  ctx.assert(medicine, 404, 'Medicine not found with this id');
  medicine.remove();
  ctx.status = 200;
  ctx.body = { success: true, status: 'Medicine Successfully Deleted' };
});
