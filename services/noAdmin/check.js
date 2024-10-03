import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import userModel from '../../models/userModel.js'
/**
 * @desc    Check if no administrator currently exists
 * @route   GET /api/firstAdmin
 * @access  public
 */
const check = catchRequestErrors(async (
  request,
  response
) => response.status(200).json({
  noAdmin: await userModel.countDocuments({
    roles: 'administrator'
  }) === 0
}))
export default check