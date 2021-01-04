const { User } = require('../models');

const UserController = {
    getAllUser(req, res) {
        User.find({})
        .select('-_v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendstatus(400);
        });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .select('-_v')
        .then(dbUserData => res.json(dbUserData))
        .catch( err => {
            console.log(err);
            res.sendstatus(400);
        });
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).JSON(err));
    },
    
}


module.exports = UserController;