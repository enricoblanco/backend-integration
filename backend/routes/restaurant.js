const router = require('express').Router();

const restaurantController = require('../controllers/restaurantController');

router
  .route("/restaurant")
  .post((req, res) => restaurantController.create(req, res))

router
  .route("/restaurant")
  .get((req, res) => restaurantController.getAll(req, res))

router
  .route("/restaurant/:id")
  .get((req, res) => restaurantController.get(req, res))

router 
  .route("/restaurant/:id")
  .delete((req, res) => restaurantController.delete(req, res))

router
  .route("/restaurant/:id")
  .put((req, res) => restaurantController.update(req, res))

module.exports = router;