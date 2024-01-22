const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            if (!user) {
                return res.status(404).json({ message: 'No user with this id' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const newUserData = await User.create(req.body);
            res.json(newUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!updUser) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(updUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })
            if (!user) {
                return res.status(404).json({ message: 'No user with this id' });
            }

            res.json({ message: 'User deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriendToUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriendFromUser(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    }
}