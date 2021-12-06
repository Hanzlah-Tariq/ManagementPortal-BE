import feeModel from "./fee.model";
import asyncHandler from "../../../middleware/async";

// @desc      get fee
// @route     Get /v1/fee/
// @access    private
export const getFee = asyncHandler(async (ctx) => {
  const fee = await feeModel.findOne();
  ctx.status = 200;
  ctx.body = { success: true, fee };
});

// @desc      add fee
// @route     POST /v1/fee/add
// @access    Private
export const addFee = asyncHandler(async (ctx) => {
  ctx.assert(ctx.request.body, 400, 'Please enter the  required fields');
  await feeModel.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = { success: true, status: 'Fee Successfully Added' };
});

// @desc      update fee
// @route     PUT /v1/fee/
// @access    Private
export const updateFee = asyncHandler(async (ctx) => {
  await feeModel.findOneAndUpdate(ctx.request.body);
  ctx.status = 200;
  ctx.body = { success: true, status: 'Fee Successfully Updated' };
});
