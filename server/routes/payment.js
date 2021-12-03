import express from 'express'

const router = express.Router();

// middlewares
import { requireSignIn } from '../middlewares'

// controllers 
import {createPayment, verifyPayment} from '../controllers/payment.js'

// routes
router.post('/create-payment', requireSignIn, createPayment)
router.post('/create-payment/verify', verifyPayment)

module.exports = router;
