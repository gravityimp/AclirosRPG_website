const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/register', 
    body('password').isLength({ min: 3, max: 30 }),
    body('email').isEmail(),
    UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

module.exports = router;