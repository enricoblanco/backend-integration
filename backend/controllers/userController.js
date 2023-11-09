const bcrypt = require('bcryptjs');

const {User : UserModel} = require('../models/User');
const { Restaurant } = require('../models/Restaurant');


const userController = {
    create: async (req, res) => {
        try {


            await connect();

            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const existingUser = await UserModel.findOne({email: user.email});

            if(existingUser) {
                res.status(400).json({msg: 'E-mail already exists'});
                return;
            }
            
            const hashedPassword = await bcrypt.hash(user.password, 10);

            const newUser = {
                name: user.name,
                email: user.email,
                password: hashedPassword
            }


            const response = await UserModel.create(newUser);

            res.status(201).json({response, msg: 'User created successfully'});
        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {

            await connect();

            const users = await UserModel.find({});

            res.status(200).json({users});
        } catch (error) {
            console.log(error);
        }
    },

    get: async(req, res) => {
        try {

            await connect();

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

            await connect();

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

            await connect();

            const id = req.params.id;

            if(!id) {
                res.status(404).json({msg: 'User not found'});
                return;
            }

            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const updatedUser = await UserModel.findByIdAndUpdate(id, user, {new: true});

            res.status(200).json({updatedUser, msg: 'User updated successfully'});
        } catch (error) {
            console.log(error);
        }
    },

    visit_restaurant: async (req, res) => {
        try {

            await connect();

            const id = req.params.id;
            if (!id) {
                res.status(404).json({ msg: 'User not found' });
                return;
            }
    
            const id_restaurant = req.body.id_restaurant;
    
            // Primeiro, encontre o restaurante pelo seu ID
            const restaurant = await Restaurant.findById(id_restaurant);
    
            if (!restaurant) {
                res.status(404).json({ msg: 'Restaurant not found' });
                return;
            }
    
            // Agora, atualize o usuário para adicionar o restaurante visitado
            const updatedUser = await UserModel.findByIdAndUpdate(id, { $push: { visited_restaurants: restaurant } }, { new: true });
    
            res.status(200).json({ updatedUser, msg: 'Restaurant added to visited list successfully' });
        } catch (error) {
            console.log(error);
        }
    },
    
}

module.exports = userController;