import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.registerUser);
router.post('/auth', userController.authUser);
router.post('/logout', () => {
  console.log('To logout');
});
router
  .route('/profile')
  .get(() => {
    console.log('To get profile');
  })
  .patch(() => {
    console.log('To Update profile');
  });

export default router;
