const {User : UserModel} = require('../models/User');

const userController = {
    create: async (req, res) => {
        try {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

            const response = await UserModel.create(user);

            res.status(201).json({response, msg: 'User created successfully'});
        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await UserModel.find({});

            res.status(200).json({users});
        } catch (error) {
            console.log(error);
        }
    },

    get: async(req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);

            if(!user) {
                res.status(404).json({msg: 'User not found'});
                return;
            }

            res.status(200).json({user});
        } catch (error) {
            console.log(error);
        }
    },

    delete: async(req, res) => {
        try {

            const user = await UserModel.findById(req.params.id);

            if(!user) {
                res.status(404).json({msg: 'User not found'});
                return;
            }

            const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

            res.status(200).json({deletedUser, msg: 'User deleted successfully'});
        }
        catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

            const updatedUser = await UserModel.findByIdAndUpdate(id, user, {new: true});

            res.status(200).json({updatedUser, msg: 'User updated successfully'});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userController;