import express from 'express'


const router = express.Router();

// middlewares
import { requireSignIn,isInstructor } from '../middlewares'

// controllers 
import {getCourses,getVideo,checkStudent,getPlanDetails,checkPaidClient,getPaidClient,getAllCourses} from '../controllers/courses.js'

// routes
router.post('/get-courses',getCourses)
router.get('/get-all-courses',getAllCourses)
router.post('/get-video',requireSignIn,getVideo)
router.get('/check-paid-client',requireSignIn,checkPaidClient)
router.get('/get-paid-client',requireSignIn,isInstructor,getPaidClient)
router.post('/plan-details',getPlanDetails)
router.post('/check-student',requireSignIn,checkStudent)

module.exports = router;
