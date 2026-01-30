const router = require('express').Router();
const attendanceController = require('../controllers/attendance.controller');
const auth = require('../middlewares/auth.middleware');

// POST /api/attendance/check-in
router.post('/check-in', auth, attendanceController.checkIn);

// POST /api/attendance/check-out
router.post('/check-out', auth, attendanceController.checkOut);

// GET /api/attendance - Get all attendance records
router.get('/', auth, attendanceController.getAllAttendance);

// GET /api/attendance/monthly
router.get('/monthly', auth, attendanceController.getMonthlyAttendance);

module.exports = router;
