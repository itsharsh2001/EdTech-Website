import express from 'express'

const router = express.Router();

// middlewares
import { requireSignIn } from '../middlewares'

// controllers 
import { register,resendotponmobile, resendOtpForgot , updatePassword ,mobileLoginCheckOtp, mobileLogin ,facebookLogin, login,googleLogin, logout, forgotPassword, currentUser, checkOtp, resendOtp} from '../controllers/auth'

// routes
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/check-otp', checkOtp)
router.post('/resend-otp-forgot-password', resendOtpForgot)
router.post('/resend-otp', resendOtp)
router.post('/resend-otp-mobile',resendotponmobile)
router.post('/forgot-password', forgotPassword)
router.post('/update-password', updatePassword)
router.post('/google/log-in', googleLogin)
router.post('/facebook/log-in', facebookLogin)
router.post('/mobile/log-in', mobileLogin)
router.post('/mobile/log-in/checkOtp', mobileLoginCheckOtp)
router.get('/current-user', requireSignIn, currentUser)
module.exports = router;
