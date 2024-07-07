import express from 'express';
import userController from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', userController.registerUser);
router.post('/auth', userController.authUser);
router.post('/logout', userController.logoutUser);
router
  .route('/profile')
  .get(protect, userController.getUserProfile)
  .patch(protect, () => {
    console.log('To Update profile');
  });

export default router;
