import express from 'express'
import formidable from 'express-formidable'


const router = express.Router();

// middlewares
import { requireSignIn,isInstructor } from '../middlewares'

// controllers 
import {checkInstructor,deleteVideo,websiteWebinar,preRecordedWebinar,getPlaylist,deleteSignal,getQueries, addVideos, addSignal, changeEmail,changePassword,addSignalTitle, currentInstructor, addVideoRelatedInputs, createPlaylist, meetWebinar} from '../controllers/instructor'

// routes
router.get('/instructor',requireSignIn, checkInstructor)
router.get('/current-instructor',requireSignIn, currentInstructor)
router.post('/instructor/change-email',requireSignIn,isInstructor, changeEmail)
router.post('/instructor/change-password',requireSignIn, changePassword)
router.post('/instructor/signals',requireSignIn,isInstructor,formidable(), addSignal)
router.post('/instructor/signal-title',requireSignIn,isInstructor, addSignalTitle)
router.post('/instructor/add-videos', requireSignIn,isInstructor,formidable({
    maxFileSize:10 * 1024 * 1024 * 1024
}), addVideos)
router.post('/instructor/add-videos/video-inputs',requireSignIn, isInstructor, addVideoRelatedInputs)
router.get('/get-queries',requireSignIn,isInstructor, getQueries)
router.get('/delete-signal',requireSignIn,isInstructor, deleteSignal)

router.post('/create-playlist',requireSignIn,isInstructor, createPlaylist)
router.get('/get-playlist',requireSignIn,isInstructor, getPlaylist)
router.post('/pre-recorded-webinar',requireSignIn,isInstructor, preRecordedWebinar)
router.post('/meet-webinar',requireSignIn,isInstructor, meetWebinar)
router.post('/website-webinar',requireSignIn,isInstructor, websiteWebinar)
router.post('/delete-video',requireSignIn,isInstructor, deleteVideo)

module.exports = router;
