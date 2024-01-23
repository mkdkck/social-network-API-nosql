const { Thought, User } = require("../models");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v')
                .populate('friends', '-__v')
                .populate('thoughts', '-__v')
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends', '-__v')
                .populate('thoughts', '-__v')
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
            await Thought.deleteMany({ _id: { $in: user.thoughts } })

            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriendToUser(req, res) {
        try {
            const addFriends = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if (!addFriends) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json({ message: 'A new friend added' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriendFromUser(req, res) {
        try {
            const deleteFriends = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendId } } },
                { runValidators: true, new: true }
            )
            if (!deleteFriends) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json({ message: 'A friend deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}