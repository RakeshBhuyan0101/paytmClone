import { Router } from 'express'
import { bulk, signin, signup, updateProfile } from '../controllers/user.controller.js'
import { authMiddleware } from '../middilewares/authMiddleware.js'

const router = Router()

router.route('/signup').post(signup)
router.route("/signin").post(signin)
router.route('/updateProfile').put( authMiddleware, updateProfile)
router.route ('/bulk').get(bulk)

export default router