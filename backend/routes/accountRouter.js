import { Router } from 'express'
import { getBalance, transferMoney } from '../controllers/account.controller.js'
import { authMiddleware } from '../middilewares/authMiddleware.js'

const router = Router()

router.route("/balance").get( authMiddleware , getBalance)
router.route("/transfer").post( authMiddleware , transferMoney)

export default router