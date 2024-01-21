const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");


module.exports = {
    async getThoughts(req, res) {
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {

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