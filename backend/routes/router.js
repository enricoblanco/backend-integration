const router = require('express').Router();

//Restaurant routes
const restaurantRouter = require('./restaurant');

router.use("/", restaurantRouter);

module.exports = router;