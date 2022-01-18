import { Router } from 'express'
import userController from '../../controllers/user.controller'
import * as statsController from '../../controllers/stats.controller'
import helpersMiddleware from '../../middleware/helpers.middleware'
import userMiddleware from '../../middleware/user.middleware'
import authMiddleware from '../../middleware/auth.middleware'
import { wrapAsync } from '../../utils/response'

const adminStatsRouter = Router()

// Get all purchase
adminStatsRouter.get(
  '/purchases',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  wrapAsync(statsController.getAllPurchases)
)
// Get sales
adminStatsRouter.get(
  '/sales',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  wrapAsync(statsController.getSales)
)
// Get income
adminStatsRouter.get(
  '/income',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  wrapAsync(statsController.getInCome)
)
// Get income
adminStatsRouter.get(
  '/user-orders',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  wrapAsync(statsController.getUserOrder)
)

export default adminStatsRouter
