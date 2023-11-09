const router = require('express').Router()

const evaluationController = require('../controllers/evaluationController')

router
  .route('/evaluation')
  .post((req, res) => evaluationController.create(req, res))

router
  .route('/evaluation')
  .get((req, res) => evaluationController.getAll(req, res))

router
  .route('/evaluation/user/:user_id')
  .get((req, res) => evaluationController.getByUser(req, res))

router
  .route('/evaluation/:id')
  .get((req, res) => evaluationController.get(req, res))

router
  .route('/evaluation/:id')
  .delete((req, res) => evaluationController.delete(req, res))

router
  .route('/evaluation/:id')
  .put((req, res) => evaluationController.update(req, res))

module.exports = router
