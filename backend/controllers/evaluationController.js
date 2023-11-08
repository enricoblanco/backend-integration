const {Evaluation : EvaluationModel} = require('../models/Evaluation');

const {Restaurant: RestaurantModel} = require('../models/Restaurant');
const {User: UserModel} = require('../models/User');

const evaluationController = {
    create: async(req, res) => {
        try {
            const evaluation = {
                user_id: req.body.user_id,
                restaurant_id: req.body.restaurant_id,
                rating: req.body.rating,
                comment: req.body.comment,
                date: req.body.date
            }

            const restaurant = await RestaurantModel.findById(req.body.restaurant_id);

            if(!restaurant){
                res.status(404).json({msg: 'Restaurant not found'});
                return;
            }

            updateRestaurant = await RestaurantModel.findByIdAndUpdate( req.body.restaurant_id, { $push: { evaluations: evaluation } });

            const user = await UserModel.findById(req.body.user_id);

            if(!user){
                res.status(404).json({msg: 'User not found'});
                return;
            }

            const response = await EvaluationModel.create(evaluation);

            res.status(201).json({response, msg: 'Evaluation created successfully'});
        } catch (error) {
            console.log(error);
        }
    }
    ,

    getAll: async(req, res) => {
        try {
            const evaluations = await EvaluationModel.find({});

            res.status(200).json({evaluations});
        } catch (error) {
            console.log(error);
        }
    },

    getByUser: async(req, res) => {
        try {
            const evaluations = await EvaluationModel.find({user_id: req.params.user_id});

            res.status(200).json({evaluations});
        } catch (error) {
            console.log(error);
        }
    },

    get: async(req, res)=>{
        try {
            const evaluation = await EvaluationModel.findById(req.params.id);

            if(!evaluation){
                res.status(404).json({msg: 'Evaluation not found'});
                return;
            }

            res.status(200).json({evaluation});
        } catch (error) {
            console.log(error);
        }
    },

    delete: async(req, res) => {
        try {
            const evaluation = await EvaluationModel.findById(req.params.id);

            if(!evaluation){
                res.status(404).json({msg: 'Evaluation not found'});
                return;
            }

            const deletedEvaluation = await EvaluationModel.findByIdAndDelete(req.params.id);

            res.status(200).json({deletedEvaluation, msg: 'Evaluation deleted successfully'});
        } catch (error) {
            console.log(error);
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id;

            if(!id){
                res.status(404).json({msg: 'Evaluation not found'});
                return;
            }

            const evaluation = {
                user_id: req.body.user_id,
                restaurant_id: req.body.restaurant_id,
                rating: req.body.rating,
                comment: req.body.comment
            }

            user = await UserModel.findById(req.body.user_id);

            if(!user){
                res.status(404).json({msg: 'User not found'});
                return;
            }

            restaurant  = await RestaurantModel.findById(req.body.restaurant_id);

            if(!restaurant){
                res.status(404).json({msg: 'Restaurant not found'});
                return;
            }

            const updatedEvaluation = await EvaluationModel.findByIdAndUpdate(id, evaluation, {new: true});

            res.status(200).json({updatedEvaluation, msg: 'Evaluation updated successfully'});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = evaluationController;