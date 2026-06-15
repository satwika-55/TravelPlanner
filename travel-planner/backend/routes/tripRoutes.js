import express from 'express';
import {
  generateTrip,
  getTrip,
  getUserTrips,
  getAllTrips,
  saveTrip,
  getSavedTrips,
} from '../controllers/tripController.js';

const router = express.Router();

router.post('/generate', generateTrip);
router.post('/save', saveTrip);
router.get('/saved/:userEmail', getSavedTrips);
router.get('/user/:userEmail', getUserTrips);
router.get('/:tripId', getTrip);
router.get('/', getAllTrips);

export default router;
