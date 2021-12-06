import pollModel from './poll.model';
import asyncHandler from '../../../middleware/async'; // @desc      get all polling associated with users
// @route     Get /v1/poll/
// @access    private

export const getPoll = asyncHandler(async ctx => {
  const poll = await pollModel.find();
  ctx.status = 200;
  ctx.body = {
    success: true,
    length: poll.length,
    poll
  };
}); // @desc      get single poll
// @route     Get /v1/poll/:id
// @access    Private

export const singPoll = asyncHandler(async ctx => {
  const poll = await pollModel.findOne({
    user: ctx.params.id
  });
  ctx.assert(poll, 404, 'poll not found with this id');
  ctx.status = 200;
  ctx.body = {
    success: true,
    poll
  };
});