const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");


module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.userId })
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

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReactionToThought(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReactionFromThought(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    }
}