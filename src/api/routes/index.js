const express = require('express');
const userRoutes = require('./user.route');
const postRoutes = require('./post.route');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
