const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authAdmin, authUserAndAdmin } = require('../middlewares/roleMiddleware');
const cors = require('cors');
// colocar cors 
router.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'role'],
}));

// rotas CRUD para user
router.get('/', userController.getAllUsers);
router.get("/admin", userController.getAllAdmins);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;
