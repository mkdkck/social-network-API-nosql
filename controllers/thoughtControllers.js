const { Thought, User } = require("../models");


module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .select('-__v')
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body)
            res.json(newThought)

            await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: { _id: newThought._id } } }
            )

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!updThought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(updThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id' });
            }

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReactionToThought(req, res) {
        try {
            const addReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            if (!addReaction) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json({ message: 'A new reaction added' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReactionFromThought(req, res) {
        try {
            const deleteReaction = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionsId } } }
            )
            if (!deleteReaction) {
                return res.status(404).json({ message: 'No thought with this id' });
            }

            res.json({ message: 'Reaction deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}