import express from 'express'

const router = express.Router();

// middlewares
import { requireSignIn } from '../middlewares'

// controllers 
import { querySubmit, getSignal} from '../controllers/home'

// routes
router.post('/contact-us', querySubmit)
router.get('/get-signal', getSignal)

module.exports = router;
