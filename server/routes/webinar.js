import express from 'express'

const router = express.Router();

// middlewares
import { requireSignIn, isInstructor } from '../middlewares'

// controllers 
import {getEmail, getWebinar,particularWebinar, deleteMeetWebinar, getRecordedWebinars,deleteWebsiteWebinar, getFinalWEbinar, deleteWebinar} from '../controllers/webinar.js'

// routes
router.get('/get-email',requireSignIn, getEmail)
router.get('/get-webinar', getWebinar)
router.get('/delete-meet-webinar',requireSignIn,isInstructor, deleteMeetWebinar)
router.get('/delete-website-webinar',requireSignIn,isInstructor, deleteWebsiteWebinar)
router.get('/get-final-webinar',getFinalWEbinar)
router.get('/get-recorded-webinars', getRecordedWebinars)
router.post('/get-particular-webinar', particularWebinar)
router.post('/delete-recorded-webinar',requireSignIn,isInstructor, deleteWebinar)
module.exports = router;
