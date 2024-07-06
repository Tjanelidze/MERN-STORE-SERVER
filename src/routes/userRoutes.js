import express from 'express';

const router = express.Router();

router.post('/', () => {
  console.log('To Register');
});
router.post('/auth', () => {
  console.log('To authorize');
});
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
