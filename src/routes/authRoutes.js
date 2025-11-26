const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const cors = require('cors');
// colocar cors 

router.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

module.exports = router;