// routes/calendarRoutes.js
const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/auth/google', calendarController.authGoogle);
router.get('/auth/google/callback', calendarController.authGoogleCallback);
router.post('/sync', calendarController.syncCalendar);

module.exports = router;
