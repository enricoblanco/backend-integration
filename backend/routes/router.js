const router = require('express').Router();

//Restaurant routes
const restaurantRouter = require('./restaurant');

router.use("/", restaurantRouter);

//User routes
const userRouter = require('./user');

router.use("/", userRouter);

module.exports = router;