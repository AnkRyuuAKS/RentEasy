import express from 'express'
import {
  getAllListingsToApprove,
  getAllUsers,
  getAllOwners,
  approveListing,
  rejectListing
} from '../controllers/admin_controller.js'

const router = express.Router()

router.get('/listings/pending', getAllListingsToApprove)
router.get('/users', getAllUsers)
router.get('/owners', getAllOwners)
router.patch('/listings/:id/approve', approveListing)
router.patch('/listings/:id/reject', rejectListing)

export default router
