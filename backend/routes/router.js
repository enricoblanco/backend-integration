const router = require('express').Router()

// Restaurant routes
const restaurantRouter = require('./restaurant')

router.use('/', restaurantRouter)

// User routes
const userRouter = require('./user')

router.use('/', userRouter)

// Evaluation routes
const evaluationRouter = require('./evaluation')

router.use('/', evaluationRouter)

module.exports = router
